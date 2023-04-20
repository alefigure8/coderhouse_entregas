import { cartsDAOs } from "../persistencia/factory.js";

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
    const cart = await cartsDAOs.getOneCart({id});
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
    const cart = await cartsDAOs.getOneCart({id});
    cart[0].products = [ ...cart[0].products, obj];
    const updatedCart = await cartsDAOs.updateCart(id, cart[0]);
    return updatedCart;
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

export const updateProductInCart = async (cid, pid, product) => {
  try {

    const cart = await cartsDAOs.getOneCart({_id: cid});
    cart.products.map((prod) => {
      if (prod.product.toString() == pid.toString()) {
        prod.quantity = product.quantity;
      }
      return prod;
    });

    const updatedCart = await cartsDAOs.updateCart(cid, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProductByIdInCart = async (cid, pid) => {
  try {
    const cart = await cartsDAOs.getOneCart({_id: cid});
    cart.products = cart.products.filter((prod) => prod.product.toString() !== pid.toString());
    const updatedCart = await cartsDAOs.updateCart(cid, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAllProductByIdInCart = async (cid) => {
  try {
    const cart = await cartsDAOs.getOneCart({_id: cid});
    cart.products = [];
    const updatedCart = await cartsDAOs.updateCart(cid, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};
