export default class CartResponse {
  constructor(cart) {
      this.product = {
        id: cart.product._id || cart.product.id,
        title: cart.product.title,
        description: cart.product.description,
        thumbnail: cart.product.thumbnail,
        code: cart.product.code,
        category: cart.product.category,
        status: cart.product.status,
        price: cart.product.price,
        stock: cart.product.stock
      }
      this.quantity = cart.quantity;
  }
}
