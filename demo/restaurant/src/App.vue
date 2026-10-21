<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { menus } from './menus.js';

const readSelected = () => new URLSearchParams(location.search).get('restaurant');
const selectedId = ref(readSelected());
const restaurant = computed(() => menus[selectedId.value]);
const justAdded = ref(null);

const onRouteChange = () => (selectedId.value = readSelected());
onMounted(() => window.addEventListener('popstate', onRouteChange));
onUnmounted(() => window.removeEventListener('popstate', onRouteChange));

function addToCart(dish) {
  window.dispatchEvent(
    new CustomEvent('cart:add', { detail: { id: dish.id, name: dish.name, price: dish.price } }),
  );
  justAdded.value = dish.id;
  setTimeout(() => {
    if (justAdded.value === dish.id) justAdded.value = null;
  }, 1200);
}
</script>

<template>
  <section class="restaurant">
    <div v-if="!restaurant" class="restaurant__empty">
      <strong>Pick a restaurant</strong>
      <p>Its menu will show up here.</p>
    </div>

    <template v-else>
      <header class="restaurant__header">
        <img class="restaurant__photo" :src="restaurant.image" alt="" />
        <div>
          <h2>{{ restaurant.name }}</h2>
          <p>{{ restaurant.tagline }}</p>
        </div>
      </header>

      <ul class="restaurant__menu">
        <li v-for="dish in restaurant.dishes" :key="dish.id" class="restaurant__dish">
          <div>
            <strong>{{ dish.name }}</strong>
            <small>{{ dish.description }}</small>
          </div>
          <span class="restaurant__price">{{ dish.price }} RON</span>
          <button class="button" @click="addToCart(dish)">
            {{ justAdded === dish.id ? 'Added ✓' : 'Add to cart' }}
          </button>
        </li>
      </ul>
    </template>
  </section>
</template>
