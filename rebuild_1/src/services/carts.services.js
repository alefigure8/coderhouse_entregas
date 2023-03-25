import CartManager from "../DAL/mongoManagers/CartManager.js";
const cartManager = new CartManager();

// Carts

export const findAllCarts = async () => {
  try {
    const carts = await cartManager.getCarts();
    return carts;
  } catch (error) {
    throw new Error(error);
  }
};

export const findOneCart = async (option) => {
  try {
    const cart = await cartManager.getOneCart(option);
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export const addCart = async (obj) => {
  try {
    const cart = await cartManager.addCart(obj);
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCart = async (id, obj) => {
  try {
    const cart = await cartManager.updateCart(id, obj);
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCart = async (id) => {
  try {
    const cart = await cartManager.deleteCart(id);
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

// Products
export const insertProductInCart = async (id, product) => {
  try {
    const cart = await cartManager.getOneCart(id);
    cart.products = [...cart.products, ...product];
    const updatedCart = await cartManager.updateCart(id, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProductInCart = async (id, product, quantity) => {
  try {
    const cart = await cartManager.getOneCart(id);
    cart.products.map((prod) => {
      if (prod._id == product._id) {
        prod.quantity = quantity;
      }
      return prod;
    });

    const updatedCart = await cartManager.updateCart(id, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProductInCart = async (id, product) => {
  try {
    const cart = await cartManager.getOneCart(id);
    cart.products = cart.products.filter((prod) => prod._id !== product._id);
    const updatedCart = await cartManager.updateCart(id, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAllProductInCart = async (id) => {
  try {
    const cart = await cartManager.getOneCart(id);
    cart.products = [];
    const updatedCart = await cartManager.updateCart(id, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};
