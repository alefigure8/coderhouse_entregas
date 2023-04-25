export default class CartsResponseDTO {
  constructor(id, product) {
    this.id = id;
    this.products = product.products.map((prod) => {
      return {
        product: prod.product.id
          ? prod.product.id
          : prod.product._id || prod.product,
        quantity: parseInt(prod.quantity),
      };
    });
  }
}
