import fs from "fs";
import { __dirname } from "../../utils.js";

class ProductManager {
  constructor() {
    this.products = [];
    this.path = __dirname + "/productos.json";
    this.id = 1;
  }

  //Generate ID
  #generateId() {
    return this.products.length != 0
      ? this.products[this.products.length - 1].id + 1
      : this.id;
  }

  //Add new
  async addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  ) {
    try {
      this.products = await this.getProducts();
      const newProduct = {};

      if (
        !this.products.some((x) => x.code === code) &&
        ![title, description, price, code, stock, category].some(
          (y) => y === "" || y === undefined
        )
      ) {
        newProduct.id = this.#generateId();
        newProduct.code = code;
        newProduct.title = title;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.thumbnail = [];
        
        if(Array.isArray(thumbnail))
          thumbnail.forEach((x) => newProduct.thumbnail.push(x));
        else
        newProduct.thumbnail.push(thumbnail);

        newProduct.stock = stock;
        newProduct.category = category;
        newProduct.status = true;

        this.products.push(newProduct);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 2),
          "utf-8"
        );

        return newProduct;
      }

      return false;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Get all
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

  //Get by ID
  async getProductById(id) {
    try {
      this.products = await this.getProducts();
      if (this.products.some((x) => x.id == id)) {
        return this.products.find((x) => x.id == id);
      } else {
        return "Not Found";
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  //Update
  async updateProduct(
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    status
  ) {
    try {
      this.products = await this.getProducts();
      const updatedUser = await this.getProductById(id);

      if (updatedUser != "Not Found") {
        updatedUser.id;
        updatedUser.code = code != undefined ? code : updatedUser.code;
        updatedUser.title = title != undefined ? title : updatedUser.title;
        updatedUser.description =
          description != undefined ? description : updatedUser.description;
        updatedUser.price = price != undefined ? price : updatedUser.price;
        updatedUser.thumbnail =
          thumbnail != undefined ? thumbnail : updatedUser.thumbnail;
        updatedUser.stock = stock != undefined ? stock : updatedUser.stock;
        updatedUser.category =
          category != undefined ? category : updatedUser.category;
        updatedUser.status = status != undefined ? status : updatedUser.status;

        this.products.map((x) => (x.code === code ? updatedUser : x));

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 2),
          "utf-8"
        );

        return updatedUser;
      }

      return false;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Delete
  async deleteProduct(id) {
    try {
      this.products = await this.getProducts();
      const deleteUser = await this.getProductById(id);

      if (deleteUser != "Not Found") {
        const listaModificada = this.products.filter((x) => x.id !== id);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(listaModificada, null, 2),
          "utf-8"
        );

        return deleteUser;
      }

      return false;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ProductManager;
