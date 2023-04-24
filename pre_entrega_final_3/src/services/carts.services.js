import { cartsDAOs } from "../persistencia/factory.js";
import CartResponseDTO from "../persistencia/DTOs/cartsResponse.js";
import mongoose from "mongoose";

export const findAllCarts = async () => {
  try {
    const carts = await cartsDAOs.getCarts();
    return carts;
  } catch (error) {
    throw new Error(error);
  }
};

export const findOneCart = async (id) => {
  try {
    const cart = await cartsDAOs.getOneCart({ id });
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export const addCart = async () => {
  try {
    const cart = await cartsDAOs.addCart();
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCart = async (id, obj) => {
  try {
    const cart = await cartsDAOs.getOneCart({ id });
    let updatedCart;

    if (Array.isArray(obj.products)) {
      updatedCart = await cartsDAOs.updateCart(id, obj);
      
    } else {
      if (
        cart.products.some(
          (x) => x.product._id.toString() == obj.product.toString()
        )
      ) {
        await updateProductInCart(id, obj.product, obj);
        return;
      }

      cart.products.push(obj);
      updatedCart = await cartsDAOs.updateCart(id, cart);
    }

    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};

// //BORRAR SI NO FUNCIONA
// export const updateCart = async (id, obj) => {
//   try {
//     console.log("id", id);
//     const cart = await cartsDAOs.getOneCart({ id });

//     const productCart = cart.products.filter((x) => {
//       const id = x.product._id ? x.product._id : x.product.id;
//        return id.toString() == obj.product.toString();
//     });

//      if (productCart) {
//       productCart.quantity = obj.quantity;
//     } else {
//       cart.products.push(obj);
//     }

//     console.log("cart", cart)

//     const updatedCart = await cartsDAOs.updateCart(id, cart);
//     return updatedCart;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const deleteCartById = async (id) => {
  try {
    const cart = await cartsDAOs.deleteCart(id);
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProductInCart = async (id, pid, product) => {
  try {
    const cart = await cartsDAOs.getOneCart({ id });

    cart.products = cart.products.map((prod) => {
      if (prod.product._id == pid) {
        prod.quantity = product.quantity;
      }
      return prod;
    });

    const updatedCart = await cartsDAOs.updateCart(id, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProductByIdInCart = async (id, pid) => {
  try {
    const cart = await cartsDAOs.getOneCart({ id });

    cart.products = cart.products.filter((prod) => {
      return prod.product._id.toString() != pid.toString();
    });

    const updatedCart = await cartsDAOs.updateCart(id, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAllProductByIdInCart = async (cid) => {
  try {
    const cart = await cartsDAOs.getOneCart({ _id: cid });
    cart.products = [];
    const updatedCart = await cartsDAOs.updateCart(cid, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};
