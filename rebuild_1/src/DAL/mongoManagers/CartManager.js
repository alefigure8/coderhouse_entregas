import { cartsModel } from "../model/carts.model.js";

/*
CarManager
  -getCarts
  -getCartById
  -addCarts
  -updateCart
  -deleteCart
  -deleteProduct
  -emptyCart
*/


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
    // async getCartById(id) {
  //   try {
  //     const cart = await cartsModel.find({ _id: id }).lean();
  //     return cart;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }


  // // Crar o Actualizar la cantidad de un producto en el carrito
  // async updateCart(id, product, quantity) {
  //   try {
  //     const cart = await cartsModel.findById(id);
  //     const productCart = cart.products.find((x) => x.product == product);
  //     if (productCart) {
  //       productCart.quantity = quantity;
  //     } else {
  //       cart.products.push({product, quantity});
  //     }
  //     const updatedCart = await cartsModel.findByIdAndUpdate(id, cart, {new: true});
  //     return updatedCart;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

   // Crar o Actualizar la cantidad de un producto en el carrito

  // //Actualizar la cantidad de un producto
  // async updateProduct(id, product, quantity) {
  //   try {
  //     const cart = await cartsModel.findById(id);
  //     const productCart = cart.products.find((x) => x.product == product);
  //     if (productCart) {
  //       productCart.quantity = quantity;
  //     }
  //     const updatedCart = await cartsModel.findByIdAndUpdate(id, cart, {new: true});
  //     return updatedCart;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  //Agregar arreglo de productos al carrito
  // async insertProductsInCart(id, products)
  // {
  //   try {
  //     const cart = await cartsModel.findById(id);
  //     cart.products = [... cart.products, ...products];
  //     const updatedCart = await cartsModel.findByIdAndUpdate(id, cart);
  //     return updatedCart;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }


  //Eliminar un producto del carrito
  // async deleteProduct(id) {
  //   try {
  //     const cart = await cartsModel.findById(id);
  //     cart.products = cart.products.filter((x) => x.id != id);
  //     await cartsModel.findByIdAndUpdate(id, cart);
  //     return cart;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // Vaciar el carrito
//   async emptyCart(id) {
//     try {
//       const cart = await cartsModel.findById(id);
//       cart.products = [];
//       await cartsModel.findByIdAndUpdate(id, cart);
//       return cart;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
}

export default CartManager;
