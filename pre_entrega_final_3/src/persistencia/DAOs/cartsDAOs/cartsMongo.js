import { cartsModel } from "../../mongoDB/model/carts.model.js";

class CartManager {

  // Obtener todos los carritos (Solo para desarrollo. Borrar!)
  async getCarts() {
    try {
      const carts = await cartsModel.find().lean();
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Obtener el carrito y sus productos
  async getOneCart(option) {
    try {
      const cart = await cartsModel.find(option).lean();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

 // Crear un carrito
  async addCart() {
    try {
      const cart = {};
      cart.products = [];
      const newCart = cartsModel.create(cart);
      return newCart;
    } catch (error) {
      throw new Error(error);
    }
  }

     async updateCart(id, product) {
    try {
      const updatedCart = await cartsModel.findByIdAndUpdate(id, product, {new: true});
      return updatedCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Eliminar el carrito
  async deleteCart(id) {
    try {
      const cart = await cartsModel.findByIdAndDelete(id);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  } 
}

export default CartManager;
