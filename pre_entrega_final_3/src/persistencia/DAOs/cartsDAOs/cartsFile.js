import fs from "fs";
import { __dirname } from "../../../utils/path.js";
import { productsDAOs } from "../../factory.js";

class CartManager {
  constructor() {
    this.carts = [];
    this.path = __dirname + "/persistencia/files/carts.json";
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

  async getOneCart(option) {
    try {
      this.carts = await this.getCarts();

      if (this.carts.some((cart) => cart.id == option.id)) {
        const cart = this.carts.find((cart) => cart.id == option.id);

        //A cada producto del carrito, le agrego el producto completo
        cart.products.map(async (x) => {
          const product = await productsDAOs.findOneProduct(x.product);
          x.product = product;
        });

        //Solucionar array en mongo al hacer populate
        return cart;
      } else {
        return "Not Found";
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCart(id, product) {
    try {
      let cart = await this.getOneCart({ id });
      const carts = await this.getCarts();
      if (cart != "Not Found") {
        
        //Desarmar objeto para guardarlo en el archivo
        const cartModify = product.products.map((x) =>
          {
            if (typeof x.product === "object") {
              return { product: x.product.id.toString(), quantity: x.quantity };
            } else {
              return x;
            }
          }
        );

        //Si el producto ya existe en el carrito, se actualiza la cantidad
        const productsGrouped = cartModify.reduce((acc, product) => {
          const { product: id, quantity } = product;
          const productFound = acc.find((product) => product.product === id);
          if (productFound) {
              const { quantity: quantityFound } = productFound;
              if (quantityFound < quantity) {
                  productFound.quantity = quantity;
              }
          } else {
              acc.push(product);
          }
          return acc;
      }, []);

      cart.products = productsGrouped;

        const newCarts = carts.map((x) => (x.id == id ? cart : x));

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(newCarts, null, 2),
          "utf-8"
        );
        return cart;
      }
      return "Not Found";
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCart(id) {
    try {
      this.carts = await this.getCarts();
      if (this.carts.some((x) => x.id == id)) {
        const deletedCart = this.carts.find((x) => x.id == id);
        this.carts = this.carts.filter((x) => x.id != id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.carts, null, 2),
          "utf-8"
        );
        return deletedCart;
      }
      return "Not Found";
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(id, product) {
    try {
      this.carts = await this.getCarts();
      const cart = await this.getCartById(id);
      if (cart != "Not Found") {
        if (cart.products.some((x) => x.product == product)) {
          cart.products = cart.products.filter((x) => x.product != product);
        }
        this.carts.map((x) => (x.id == id ? cart : x));
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.carts, null, 2),
          "utf-8"
        );
        return cart;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CartManager;
