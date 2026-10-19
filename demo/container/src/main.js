import './styles.css';
import './demo-panel.js';
import { apps, downApps } from './config.js';

// 1. The cart. Team Restaurant sends a 'cart:add' event, the container listens.
const cart = { count: 0, total: 0 };
const cartElement = document.getElementById('cart');

window.addEventListener('cart:add', (event) => {
  cart.count += 1;
  cart.total += event.detail.price;
  cartElement.querySelector('[data-count]').textContent = `${cart.count} ${cart.count === 1 ? 'item' : 'items'}`;
  cartElement.querySelector('[data-total]').textContent = cart.total;
  cartElement.classList.remove('cart--bump');
  void cartElement.offsetWidth; // restart the animation
  cartElement.classList.add('cart--bump');
});

// 2. Loading a micro frontend = adding its script tag to the page
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Could not load ${src}`));
    document.head.append(script);
  });
}

// 3. The contract: every bundle defines window.render<Name>(containerId)
async function mount(app) {
  const element = document.getElementById(app.mountId);
  element.style.setProperty('--team-color', app.color);

  // A "down" app points to a file that does not exist, so the request really fails
  const isDown = downApps().includes(app.name);
  const src = `${app.url}${isDown ? '/offline' : ''}/main.js`;

  try {
    await loadScript(src);
    const info = window[`render${app.name}`](app.mountId);
    element.dataset.label = describe(app, info, src);
  } catch (error) {
    console.error(`[container] ${app.name} failed to load`, error);
    element.innerHTML = `
      <div class="fallback">
        <strong>${app.name} is unavailable right now</strong>
        <p>The rest of Feed me keeps working.</p>
      </div>`;
    element.dataset.label = `${app.team} · unavailable`;
  }
}

// Text shown when "Show boundaries" is on: who built it, with what, and when
function describe(app, info, src) {
  const builtAt = new Date(info.builtAt).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  });
  // How much JavaScript this app downloaded (the "payload" downside)
  const entry = src && performance.getEntriesByName(new URL(src, location.href).href)[0];
  const size = entry?.encodedBodySize ? ` · ${Math.round(entry.encodedBodySize / 1024)} KB` : '';
  return `${app.name} · ${info.tech} · v${info.version} · built ${builtAt}${size}`;
}

const header = document.getElementById('container-header');
header.style.setProperty('--team-color', '#ea580c');
header.dataset.label = describe(
  { name: 'Container' },
  { tech: 'HTML + JS', version: __APP_VERSION__, builtAt: __BUILD_TIME__ },
);

apps.forEach(mount);
