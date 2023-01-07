import fs from "fs";

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./productos.txt";
    this.id = 1;
  }

  #generateId() {
    return this.products.length != 0
      ? this.products[this.products.length - 1].id + 1
      : this.id;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      this.products = await this.getProducts();
      const newProduct = {};

      if (
        !this.products.some((x) => x.code === code) &&
        ![title, description, price, thumbnail, code, stock].some(
          (y) => y === "" || y === undefined
        )
      ) {
        newProduct.id = this.#generateId();
        newProduct.code = code;
        newProduct.title = title;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.thumbnail = thumbnail;
        newProduct.stock = stock;

        this.products.push(newProduct);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 2),
          "utf-8"
        );

        return true;
      }

      return false;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const infoProductos = await fs.promises.readFile(this.path, "utf-8");
        this.products = await JSON.parse(infoProductos);
        return this.products;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(id) {
    try {
      this.products = await this.getProducts();
      if (this.products.some((x) => x.id === id)) {
        return this.products.find((x) => x.id === id);
      } else {
        return "Not Found";
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ProductManager;
