import './styles.css';
import './demo-panel.js';
import { apps, downApps } from './config.js';

const cart = { count: 0, total: 0 };
const cartElement = document.getElementById('cart');

window.addEventListener('cart:add', (event) => {
  cart.count += 1;
  cart.total += event.detail.price;
  cartElement.querySelector('[data-count]').textContent = `${cart.count} ${cart.count === 1 ? 'item' : 'items'}`;
  cartElement.querySelector('[data-total]').textContent = cart.total;
  cartElement.classList.remove('cart--bump');
  void cartElement.offsetWidth;
  cartElement.classList.add('cart--bump');
});

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Could not load ${src}`));
    document.head.append(script);
  });
}

async function mount(app) {
  const element = document.getElementById(app.mountId);
  element.style.setProperty('--team-color', app.color);

  const isDown = downApps().includes(app.name);
  const src = `${app.url}${isDown ? '/offline' : ''}/main.js`;

  try {
    await loadScript(src);
    const info = window[`render${app.name}`](app.mountId);
    element.dataset.label = describe(app, info);
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

function describe(app, info) {
  return `${app.name} · ${info.tech} · v${info.version}`;
}

const header = document.getElementById('container-header');
header.style.setProperty('--team-color', '#ea580c');
header.dataset.label = describe(
  { name: 'Container' },
  { tech: 'HTML + JS', version: __APP_VERSION__ },
);

apps.forEach(mount);
