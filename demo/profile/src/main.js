// Team Profile: a Web Component (custom element) with Shadow DOM.
// Styles inside the shadow root cannot leak out, and outside styles cannot get in.

const addresses = ['FII, Str. General Berthelot 16', 'Palas Mall, Str. Palas 7A', 'Copou Park, Bd. Carol I'];

const css = `
  :host { display: block; }
  .card { display: grid; gap: 16px; padding: 20px; background: #fff; border: 1px solid #e7e5e4; border-radius: 16px; }
  .who { display: flex; align-items: center; gap: 14px; }
  .avatar {
    display: grid; place-items: center; flex: none; width: 56px; height: 56px; border-radius: 50%;
    background: linear-gradient(135deg, #a855f7, #6366f1); color: #fff; font-weight: 700; font-size: 1.2rem;
  }
  h2 { margin: 0; font-size: 1.15rem; }
  p { margin: 0; color: #78716c; }
  .box { padding: 12px 14px; border-radius: 12px; background: #faf5ff; }
  .box small {
    display: block; margin-bottom: 2px; color: #7e22ce; font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase;
  }
  .box p { color: #1c1917; }

  /* Same class name as the other teams. Here it is safe. */
  .button {
    background: #9333ea; color: #fff; border: 1px solid #9333ea; border-radius: 10px;
    padding: 10px 16px; font: inherit; font-weight: 600; cursor: pointer;
  }
  .button:hover { background: #7e22ce; }
`;

class ProfileCard extends HTMLElement {
  #items = 0;
  #total = 0;
  #address = 0;

  #onCartAdd = (event) => {
    this.#items += 1;
    this.#total += event.detail.price;
    this.shadowRoot.querySelector('[data-cart]').textContent = this.#cartText();
  };

  #cartText() {
    return `${this.#items} ${this.#items === 1 ? 'item' : 'items'} · ${this.#total} RON`;
  }

  connectedCallback() {
    const shadow = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>${css}</style>
      <div class="card">
        <div class="who">
          <div class="avatar">M</div>
          <div>
            <h2>Miruna</h2>
            <p>Hungry student</p>
          </div>
        </div>
        <div class="box">
          <small>Deliver to</small>
          <p data-address>${addresses[this.#address]}</p>
        </div>
        <div class="box">
          <small>Your cart</small>
          <p data-cart>${this.#cartText()}</p>
        </div>
        <button class="button" data-change>Change address</button>
      </div>`;

    shadow.querySelector('[data-change]').addEventListener('click', () => {
      this.#address = (this.#address + 1) % addresses.length;
      shadow.querySelector('[data-address]').textContent = addresses[this.#address];
    });

    // Profile hears the same 'cart:add' event as the container. No shared store.
    window.addEventListener('cart:add', this.#onCartAdd);
  }

  disconnectedCallback() {
    window.removeEventListener('cart:add', this.#onCartAdd);
  }
}

if (!customElements.get('mfe-profile')) {
  customElements.define('mfe-profile', ProfileCard);
}

// The contract with the container: render into an element, and clean up after
window.renderProfile = (containerId) => {
  document.getElementById(containerId).replaceChildren(document.createElement('mfe-profile'));
  return { tech: 'Web Component', version: __APP_VERSION__, builtAt: __BUILD_TIME__ };
};

window.unmountProfile = (containerId) => {
  document.getElementById(containerId).replaceChildren();
};
