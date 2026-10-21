import { createApp, version } from 'vue';
import App from './App.vue';
import { css } from './styles.js';

const apps = new Map();

window.renderRestaurant = (containerId) => {
  if (!document.getElementById('restaurant-styles')) {
    const tag = document.createElement('style');
    tag.id = 'restaurant-styles';
    tag.textContent = css;
    document.head.append(tag);
  }
  const app = createApp(App);
  app.mount(`#${containerId}`);
  apps.set(containerId, app);
  return { tech: `Vue ${version}`, version: __APP_VERSION__, builtAt: __BUILD_TIME__ };
};

window.unmountRestaurant = (containerId) => {
  apps.get(containerId)?.unmount();
  apps.delete(containerId);
};
