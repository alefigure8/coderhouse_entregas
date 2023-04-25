import fs from "fs";
import { __dirname } from "../../../utils/path.js";
import ProductDB from "../../DTOs/productsDB.dto.js";
import ProductsResponse from "../../DTOs/productsResponse.dto.js";

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
      this.products.docs.push(new ProductsResponse(productDB));
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
        const response = { docs: [] };

        this.products.docs.forEach((product) =>
          response.docs.push(product)
        );

        return response;
      } else {
        return { docs: [] };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  //Get by ID
  async findOneProduct(id) {
    try {
      this.products = await this.findAll();
      if (this.products.docs.some((product) => product.id == id)) {
        return this.products.docs.find((product) => product.id == id)
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
      let isProduct = await this.findOneProduct(id);

      
      if (isProduct != "Not Found") {
        isProduct = {...isProduct, ...product};
        this.products.docs.map((prod) =>
          prod.code === product.code ? isProduct : prod
        );

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 2),
          "utf-8"
        );

        return isProduct;
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
        const listaModificada = this.products.docs.filter((product) => product.id !== id);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(listaModificada, null, 2),
          "utf-8"
        );

        return deleteUser;
      }

      return "Not Found";
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ProductManager;
