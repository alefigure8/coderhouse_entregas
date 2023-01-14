import fs from "fs";

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./productos.json";
    this.id = 1;
  }

  #generateId() {
    return this.products.length != 0
      ? this.products[this.products.length - 1].id + 1
      : this.id;
  }

  async addProduct(title, description, price, thumbnail, code, stock, category, status) {
    try {
      this.products = await this.getProducts();
      const newProduct = {};

      if (
        !this.products.some((x) => x.code === code) &&
        ![title, description, price, thumbnail, code, stock, category, status].some(
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
        newProduct.category = category;
        newProduct.status = status;

        this.products.push(newProduct);
        console.log(this.products)

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

  async updateProduct(title, description, price, thumbnail, code, stock, category, status) {
    try {
      this.products = await this.getProducts();
      const updatedUser = this.products.find((x) => x.code === code);

      if (updatedUser != undefined) {
        updatedUser.id;
        updatedUser.code = code;
        updatedUser.title = title;
        updatedUser.description = description;
        updatedUser.price = price;
        updatedUser.thumbnail = thumbnail;
        updatedUser.stock = stock;
        updatedUser.category = category;
        updatedUser.status = status;

        this.products.map(x=> x.code === code ? updatedUser : x);

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
      const deleteUser = this.products.find((x) => x.id === id);
      
      //Validar que exista el producto
      if (deleteUser != undefined) {
        
        const listaModificada = this.products.map(x=> x.id !== id && x);

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
