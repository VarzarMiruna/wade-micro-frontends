import { version } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { baseCss, buttonCss } from './styles.js';

const roots = new Map();

function applyStyles(release = 'v1') {
  let tag = document.getElementById('browse-styles');
  if (!tag) {
    tag = document.createElement('style');
    tag.id = 'browse-styles';
  }
  tag.textContent = baseCss + buttonCss(release);
  document.head.append(tag); // last in <head>, so it wins ties with other teams' CSS
}

// The demo panel simulates Team Browse deploying a new version of its CSS
window.addEventListener('demo:browse-release', (event) => applyStyles(event.detail.release));

// The contract with the container: render into an element, and clean up after
window.renderBrowse = (containerId) => {
  applyStyles();
  const root = createRoot(document.getElementById(containerId));
  root.render(<App />);
  roots.set(containerId, root);
  return { tech: `React ${version}`, version: __APP_VERSION__, builtAt: __BUILD_TIME__ };
};

window.unmountBrowse = (containerId) => {
  roots.get(containerId)?.unmount();
  roots.delete(containerId);
};
