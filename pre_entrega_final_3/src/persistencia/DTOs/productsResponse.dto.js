export default class ProductsResponseDTO {
  constructor(product) {
    this._id = product.id;
    this.code = product.code;
    this.title = product.title;
    this.description = product.description;
    this.thumbnail = product.thumbnail;
    this.price = product.price;
    this.stock = product.stock;
    this.category = product.category;
    this.status = product.status;
  }
}
