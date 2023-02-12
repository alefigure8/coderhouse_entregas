import { cartsModel } from "../model/carts.model.js";

class CartManager {
  constructor() {
    this.carts = [];
  }

  async getCarts() {
    try {
      this.carts = await cartsModel.find();
      return this.carts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCart() {
    try {
      console.log("addCart");
      const cart = {};
      cart.products = [];
      const newCart = cartsModel.create(cart);
      return newCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartsModel.findById(id).populate("products.product");
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCart(id, product, quantity) {
    try {
      const cart = await cartsModel.findById(id);
      const productCart = cart.products.find((x) => x.product == product);
      if (productCart) {
        //TODO: PENSAR SI LA LOGICA DE SUMAR CANTIDAD NO ES MEJOR HACERLA EN EL FRONT
        productCart.quantity += quantity;
      } else {
        cart.products.push({ product: product, quantity: quantity });
      }
      await cartsModel.findByIdAndUpdate(id, cart);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCart(id) {
    try {
      const cart = await cartsModel.findByIdAndDelete(id);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(id, product) {
    try {
      const cart = await cartsModel.findById(id);
      cart.products = cart.products.filter((x) => x.product != product);
      await cartsModel.findByIdAndUpdate(id, cart);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CartManager;
