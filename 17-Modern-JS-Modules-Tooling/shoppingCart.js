const shippingCost = 10;
const cart = [];
const totalPrice = 1200;
const totalQuantity = 32;

export default function addToCart(qty, product) {
  cart.push({ product, qty });
  console.log(`${qty} ${product} added to cart`);
}
export { totalPrice, totalQuantity };
