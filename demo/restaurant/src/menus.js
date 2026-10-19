// Photos live in public/images and are deployed with this app, not with the container.
// The container loads us from another origin, so build the URL from our own script tag.
const assetBase = document.currentScript ? new URL('.', document.currentScript.src).href : '/';
const photo = (id) => `${assetBase}images/${id}.jpg`;

// Team Restaurant owns its own data. The ids match the ones in the URL.
export const menus = {
  'pizza-copou': {
    name: 'Pizza Copou',
    image: photo('pizza-copou'),
    tagline: 'Wood-fired pizza near the university',
    dishes: [
      { id: 'margherita', name: 'Margherita', description: 'Tomato, mozzarella, basil', price: 32 },
      { id: 'diavola', name: 'Diavola', description: 'Spicy salami, chili oil', price: 38 },
      { id: 'quattro', name: 'Quattro Formaggi', description: 'Four cheeses, honey', price: 41 },
    ],
  },
  'sushi-palas': {
    name: 'Sushi Palas',
    image: photo('sushi-palas'),
    tagline: 'Fresh rolls, made to order',
    dishes: [
      { id: 'salmon-roll', name: 'Salmon roll', description: '8 pieces, avocado', price: 36 },
      { id: 'tempura', name: 'Shrimp tempura', description: '6 pieces, sweet chili', price: 42 },
      { id: 'miso', name: 'Miso soup', description: 'Tofu, wakame', price: 15 },
    ],
  },
  'burger-tatarasi': {
    name: 'Burger Tătărași',
    image: photo('burger-tatarasi'),
    tagline: 'Smash burgers and crispy fries',
    dishes: [
      { id: 'classic', name: 'Classic smash', description: 'Double beef, cheddar', price: 35 },
      { id: 'chicken', name: 'Crispy chicken', description: 'Pickles, spicy mayo', price: 33 },
      { id: 'fries', name: 'Fries', description: 'With rosemary salt', price: 12 },
    ],
  },
  'green-bowl': {
    name: 'Green Bowl Păcurari',
    image: photo('green-bowl'),
    tagline: 'Bowls, salads and smoothies',
    dishes: [
      { id: 'poke', name: 'Salmon poke', description: 'Rice, edamame, mango', price: 39 },
      { id: 'falafel', name: 'Falafel bowl', description: 'Hummus, quinoa, greens', price: 31 },
      { id: 'smoothie', name: 'Green smoothie', description: 'Spinach, apple, ginger', price: 18 },
    ],
  },
  'la-bunica': {
    name: 'La Bunica',
    image: photo('la-bunica'),
    tagline: 'Home-style Romanian food',
    dishes: [
      { id: 'sarmale', name: 'Sarmale', description: 'With polenta and sour cream', price: 34 },
      { id: 'ciorba', name: 'Ciorbă de burtă', description: 'With garlic and hot pepper', price: 22 },
      { id: 'papanasi', name: 'Papanași', description: 'Sour cream and jam', price: 24 },
    ],
  },
};
