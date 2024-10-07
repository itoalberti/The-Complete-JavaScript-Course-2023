import { totalPrice, totalQuantity } from './shoppingCart.js';
console.log('Importing module');

console.log(totalPrice);
// import * → imports everything that is exported by that module as one object
// import * as ShoppingCart from './shoppingCart.js';

// when something is exported by default, it can be imported with a different name (defaultExported):
// import add from './shoppingCart.js' will import 'addToCart' as 'add'
import addToCart from './shoppingCart.js';
addToCart(14, 'apple');

const getLastPost = async function () {
  const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await resp.json();
  return { title: data.at(-1).title, post: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

const shoppingCart = (function () {
  const cart = [];
  const totalPrice = 350;
  const totalQuantity = 35;
  const shipping = 0.07 * totalPrice;

  const addToCart = function (qty, product) {
    cart.push({ product: product, quantity: qty });
    console.log(
      `${qty} ${product} added to cart. Shipping cost: $${shipping.toFixed(2)}`
    );
  };

  const orderStock = function (qty, product) {
    console.log(`${qty} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

shoppingCart.addToCart(18, 'apple');
shoppingCart.addToCart(87, 'banana');
console.log(shoppingCart);
console.log(shoppingCart.shipping);

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'watermelon', quantity: 8 },
    { product: 'package of jellybeans', quantity: 7 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
console.log('stateClone:', stateClone);
const stateCloneDeep = cloneDeep(state);
console.log('stateCloneDeep:', stateCloneDeep);

state.user.loggedIn = false;
console.log('stateClone:', stateClone);
console.log('stateCloneDeep:', stateCloneDeep);
