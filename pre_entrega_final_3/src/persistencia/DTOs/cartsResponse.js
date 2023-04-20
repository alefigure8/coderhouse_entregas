export default class CartResponse {
  constructor(cart) {
    this.id = cart.id;
    this.products = cart.product;
  }
}
