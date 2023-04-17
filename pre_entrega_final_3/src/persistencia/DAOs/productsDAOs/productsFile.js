import fs from "fs";
import { __dirname } from "../../../utils/path.js";
import ProductDB from '../../DTOs/productsDB.dto.js'
import ProductsResponse from '../../DTOs/productsResponse.dto.js'

class ProductManager {
  constructor() {
    this.products;
    this.path = __dirname + "/persistencia/files/products.json";
    this.id = 1;
  }

  //Generate ID
  #generateId() {
    return this.products.docs.length != 0
      ? this.products.docs[this.products.docs.length - 1].id + 1
      : this.id;
  }

  //Add new
  async addProduct(product) {
    try {
      const productDB = new ProductDB(product);
      this.products = await this.findAll();
      productDB.id = this.#generateId();
      this.products.docs.push(productDB);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2),
        "utf-8"
      );
      return productDB;
    } catch (error) {
      throw new Error(error);
    }
  }

  // GET ALL PRODUCTS
  async findAll() {
    try {
      if (fs.existsSync(this.path)) {
        const infoProductos = await fs.promises.readFile(this.path, "utf-8");
        this.products = await JSON.parse(infoProductos);
        const response = {docs: []}
        this.products.docs.forEach((x) => response.docs.push(new ProductsResponse(x)));
        return response;
      } else {
        return {docs: []};
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  //Get by ID
  async findOneProduct(id) {
    try {
      this.products = await this.findAll();
      if (this.products.docs.some((x) => x._id == id._id)) {
        console.log(this.products.docs.find((x) => x._id == id._id))
        return this.products.docs.find((x) => x._id == id._id);
      } else {
        return "Not Found";
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  //Update
  async updateProduct(id, product) {
    try {
      this.products = await this.findAll();
      const updatedUser = await this.findOneProduct(id);

      if (updatedUser != "Not Found") {
        updatedUser.id;
        updatedUser.code = product.code != undefined ? product.code : updatedUser.code;
        updatedUser.title = product.title != undefined ? product.title : updatedUser.title;
        updatedUser.description =
          product.description != undefined ? product.description : updatedUser.description;
        updatedUser.price = product.price != undefined ? product.price : updatedUser.price;
        updatedUser.thumbnail =
          product.thumbnail != undefined ? product.thumbnail : updatedUser.thumbnail;
        updatedUser.stock = product.stock != undefined ? product.stock : updatedUser.stock;
        updatedUser.category =
          product.category != undefined ? product.category : updatedUser.category;
        updatedUser.status = product.status != undefined ? product.status : updatedUser.status;

        this.products.docs.map((x) => (x.code === product.code ? updatedUser : x));

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 2),
          "utf-8"
        );

        return updatedUser;
      }

      return "Not Found";
    } catch (error) {
      throw new Error(error);
    }
  }

  //Delete
  async delete(id) {
    try {
      this.products = await this.findAll();
      const deleteUser = await this.findOneProduct(id);

      if (deleteUser != "Not Found") {
        const listaModificada = this.products.docs.filter((x) => x.id !== id);

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
