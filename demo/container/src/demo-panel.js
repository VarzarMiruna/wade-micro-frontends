import { apps, downApps } from './config.js';

// The buttons used during the presentation. Not part of the shop itself.
// It lives in Shadow DOM, so bad CSS from the teams cannot break it either.

const releases = {
  v1: { label: 'v1', hint: 'Each team’s CSS stays inside its own box.' },
  leaky: { label: 'v2 · global', hint: 'Browse ships a global .button rule: the Restaurant buttons break too. Profile is safe thanks to Shadow DOM.' },
  scoped: { label: 'v2 · @scope', hint: 'Same CSS, wrapped in @scope (.browse): only Browse changes.' },
};

const css = `
  :host {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 100;
    width: 340px;
    font: 15px/1.4 system-ui, sans-serif;
    color: #1c1917;
  }
  details {
    background: #fff;
    border: 1px solid #e7e5e4;
    border-radius: 16px;
    box-shadow: 0 12px 32px rgb(0 0 0 / 0.12);
  }
  summary {
    padding: 12px 16px;
    font-weight: 700;
    cursor: pointer;
  }
  section {
    padding: 10px 16px;
    border-top: 1px solid #f5f5f4;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 14px;
  }
  .footer {
    justify-content: flex-end;
    padding: 8px 16px 12px;
    border-top: 1px solid #f5f5f4;
  }
  h3 {
    margin: 0 0 8px;
    font-size: 0.8rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #78716c;
  }
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 3px 0;
    cursor: pointer;
  }
  input {
    width: 18px;
    height: 18px;
    accent-color: #ea580c;
  }
  .segmented {
    display: flex;
    gap: 4px;
    padding: 4px;
    background: #f5f5f4;
    border-radius: 10px;
  }
  .segmented button {
    flex: 1;
    padding: 8px 6px;
    border: 0;
    border-radius: 7px;
    background: transparent;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }
  .segmented button[aria-pressed='true'] {
    background: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.15);
  }
  .hint {
    margin: 8px 0 0;
    color: #57534e;
    font-size: 0.88rem;
  }
  .reset {
    margin-left: auto;
    padding: 4px 12px;
    border: 1px solid #e7e5e4;
    border-radius: 8px;
    background: #fff;
    font: inherit;
    cursor: pointer;
  }
  @media (max-width: 600px) {
    :host {
      left: 16px;
      right: 16px;
      bottom: 16px;
      width: auto;
    }
  }
`;

class DemoPanel extends HTMLElement {
  connectedCallback() {
    const down = downApps();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>${css}</style>
      <details>
        <summary>Demo controls</summary>
        <section>
          <h3>1 · Who built what?</h3>
          <label><input type="checkbox" data-boundaries /> Show boundaries</label>
        </section>
        <section>
          <h3>2 · Team Browse ships a release</h3>
          <div class="segmented">
            ${Object.entries(releases)
              .map(([id, r]) => `<button data-release="${id}" aria-pressed="${id === 'v1'}">${r.label}</button>`)
              .join('')}
          </div>
          <p class="hint">${releases.v1.hint}</p>
        </section>
        <section>
          <h3>3 · Take an app down</h3>
          <div class="row">
            ${apps
              .map((app) => `<label><input type="checkbox" data-down="${app.name}" ${down.includes(app.name) ? 'checked' : ''} /> ${app.name}</label>`)
              .join('')}
          </div>
        </section>
        <div class="footer row">
          <button class="reset" data-reset>↺ Reset</button>
        </div>
      </details>`;

    // Open on large screens, closed on phones
    shadow.querySelector('details').open = matchMedia('(min-width: 600px)').matches;

    shadow.querySelector('[data-boundaries]').addEventListener('change', (event) => {
      document.body.classList.toggle('show-boundaries', event.target.checked);
    });

    shadow.querySelectorAll('[data-release]').forEach((button) => {
      button.addEventListener('click', () => {
        const release = button.dataset.release;
        shadow.querySelectorAll('[data-release]').forEach((b) => b.setAttribute('aria-pressed', b === button));
        shadow.querySelector('.hint').textContent = releases[release].hint;
        // Simulates Team Browse deploying a new version of its CSS
        window.dispatchEvent(new CustomEvent('demo:browse-release', { detail: { release } }));
      });
    });

    shadow.querySelectorAll('[data-down]').forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const url = new URL(location.href);
        url.searchParams.delete('down');
        shadow.querySelectorAll('[data-down]:checked').forEach((c) => url.searchParams.append('down', c.dataset.down));
        location.assign(url);
      });
    });

    shadow.querySelector('[data-reset]').addEventListener('click', () => {
      location.assign(location.pathname);
    });

    // Keyboard shortcuts, so the panel can stay closed during the talk
    const releaseButtons = [...shadow.querySelectorAll('[data-release]')];
    window.addEventListener('keydown', (event) => {
      if (event.target.closest?.('input, textarea') || event.ctrlKey || event.metaKey || event.altKey) return;
      const key = event.key.toLowerCase();
      if (key === 'b') shadow.querySelector('[data-boundaries]').click();
      if (['1', '2', '3'].includes(key)) releaseButtons[Number(key) - 1].click();
      if (key === 'd') shadow.querySelector('details').open = !shadow.querySelector('details').open;
    });
  }
}

customElements.define('demo-panel', DemoPanel);
