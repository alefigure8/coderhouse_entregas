export default class CartsResponseDTO {
  constructor(product) {
    this.id = product._id || product.id,
    this.products = product.products.map((prod) => {
      return {
        product: {
          id: prod.product._id || prod.product.id,
          title: prod.product.title,
          code: prod.product.code,
          thumbnail: prod.product.thumbnail,
          price: prod.product.price,
          stock: prod.product.stock,
          description: prod.product.description,
          category: prod.product.category,
          status: prod.product.status,
        },
        quantity: prod.quantity,
      };
    });
  }
}