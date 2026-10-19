// Photos live in public/images and are deployed with this app, not with the container.
// The container loads us from another origin, so build the URL from our own script tag.
const assetBase = document.currentScript ? new URL('.', document.currentScript.src).href : '/';
const photo = (id) => `${assetBase}images/${id}.jpg`;

export const cuisines = ['All', 'Pizza', 'Sushi', 'Burgers', 'Healthy', 'Romanian'];

export const restaurants = [
  { id: 'pizza-copou', name: 'Pizza Copou', cuisine: 'Pizza', image: photo('pizza-copou'), rating: 4.7, time: 25 },
  { id: 'sushi-palas', name: 'Sushi Palas', cuisine: 'Sushi', image: photo('sushi-palas'), rating: 4.8, time: 35 },
  { id: 'burger-tatarasi', name: 'Burger Tătărași', cuisine: 'Burgers', image: photo('burger-tatarasi'), rating: 4.5, time: 20 },
  { id: 'green-bowl', name: 'Green Bowl Păcurari', cuisine: 'Healthy', image: photo('green-bowl'), rating: 4.6, time: 15 },
  { id: 'la-bunica', name: 'La Bunica', cuisine: 'Romanian', image: photo('la-bunica'), rating: 4.9, time: 30 },
];
