import { cartsDAOs } from "../persistencia/factory.js";
import CartsResponseDTO from "../persistencia/DTOs/cartsResponse.dto.js";
import CartDB from "../persistencia/DTOs/cartDB.dto.js";

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
    const cartResponse = new CartsResponseDTO(cart);
    return cartResponse;
  } catch (error) {
    throw new Error(error);
  }
};

export const addCart = async () => {
  try {
    const cart = await cartsDAOs.addCart();
    const cartResponse = new CartsResponseDTO(cart);
    return cartResponse;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCart = async (id, obj) => {
  try {
    const cart = await cartsDAOs.getOneCart({ id });
    const cartResponse = new CartsResponseDTO(cart);  
    
    let updatedCart;
    
    if (Array.isArray(obj.products)) {
      const cartData = new CartDB(id, obj);
      updatedCart = await cartsDAOs.updateCart(id, cartData);
      
    } else {
      if (
        cartResponse.products.some(
          (x) => x.product.id.toString() == obj.product.toString()
        )
      ) {
        await updateProductInCart(id, obj.product, obj);
        return;
      }

      const cartData = new CartDB(id, cart);
      cartData.products.push(obj);
      
      updatedCart = await cartsDAOs.updateCart(id, cartData);
    }
    const updatedCartResponse = new CartsResponseDTO(updatedCart);
    return updatedCartResponse;
  } catch (error) {
    throw new Error(error);
  }
};

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
    const cartResponse = new CartsResponseDTO(cart);
    cart.products = cartResponse.products.map((prod) => {
      if (prod.product.id == pid) {
        prod.quantity = product.quantity;
      }
      return prod;
    });
    const cartData = new CartDB(id, cartResponse);
    const updatedCart = await cartsDAOs.updateCart(id, cartData);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProductByIdInCart = async (id, pid) => {
  try {
    const cart = await cartsDAOs.getOneCart({ id });
    const cartResponse = new CartsResponseDTO(cart);  
    cart.products = cartResponse.products.filter((prod) => {
      return prod.product.id != pid;
    });
    const cartData = new CartDB(id, cartResponse);
    const updatedCart = await cartsDAOs.updateCart(id, cartData);
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
