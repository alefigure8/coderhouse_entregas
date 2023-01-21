import fs from "fs";

class CartManager {
  constructor() {
    this.carts = [];
    this.path = "./carritos.json";
    this.id = 1;
  }

  #generateId() {
    return this.carts.length != 0
      ? this.carts[this.carts.length - 1].id + 1
      : this.id;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const infoCarts = await fs.promises.readFile(this.path, "utf-8");
        this.carts = await JSON.parse(infoCarts);
        return this.carts;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCart() {
    const newCart = {};
    try {
      this.carts = await this.getCarts();
      newCart.id = this.#generateId();
      newCart.products = [];

      this.carts.push(newCart);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.carts, null, 2),
        "utf-8"
      );
      return newCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    try {
      this.carts = await this.getCarts();
      if (this.carts.some((x) => x.id === id)) {
        return this.carts.find((x) => x.id === id);
      } else {
        return "Not Found";
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCart(id, product, quantity) {
    try {
      const cart = await this.getCartById(id);

      if (cart != "Not Found") {
        if (cart.products.some((x) => x.product === product)) {
          cart.products.find((x) => x.product === product).quantity += quantity;
        } else {
          cart.products.push({product, quantity});
        }

        this.carts.map((x) => (x.id === id ? cart : x));

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.carts, null, 2),
          "utf-8"
        );
        return cart;
      }
      return "Not Found";
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CartManager;
