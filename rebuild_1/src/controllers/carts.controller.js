import {
  addCart,
  deleteAllProductByIdInCart,
  deleteProductByIdInCart,
  findOneCart,
  updateCart,
  updateProductInCart,
  deleteCartById,
} from "../services/carts.services.js";
import { findOneProductById } from "../services/products.services.js";

// Obtener un carrito por id
export const getCart = async (req, res) => {
  try {
    const cart = await findOneCart(req.params.cid);

    if (!cart) return res.status(400).json({ error: "cart not found" });

    res.json({ msg: "Cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un carrito
export const postCart = async (req, res) => {
  try {
    if (
      Object.values(req.body).includes("") ||
      Object.values(req.body).includes(undefined)
    ) {
      return res.status(400).json({ msg: "All field are required" });
    }
    const cart = await addCart(req.body);
    res.json({ msg: "Cart created", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un producto o arreglo de producto en el carrito
export const putCart = async (req, res) => {
  try {
    const cartDB = await findOneCart(req.params.cid);
    const productDB = await findOneProductById(req.body.product);

    if (!cartDB) {
      return res.status(400).json({ msg: "Cart not found" });
    }

    if (!productDB) {
      return res.status(400).json({ msg: "Product not found" });
    }

    if (
      cartDB.products.find(
        (prod) => prod.product.toString() == productDB._id.toString()
      )
    ) {
      return res.status(400).json({ msg: "Product is already in the cart" });
    }

    const cart = await updateCart(req.params.cid, req.body)
    res.json({ msg: "Product added in Cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Eliminar carrito
export const deleteCart = async (req, res) => {
  try {
    if (!(await findOneCart(req.params.cid))) {
      return res.status(400).json({ msg: "Cart not found" });
    }
    const cart = await deleteCartById(req.params.cid);
    res.json({ msg: "Cart deleted", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Acualizar un producto del carrito
export const putProductInCart = async (req, res) => {
  try {
    const cartDB = await findOneCart(req.params.cid);
    const productDB = await findOneProductById(req.params.pid);

    if (!(await findOneCart(req.params.cid))) {
      return res.status(400).json({ msg: "Cart not found" });
    }

    if (!(await findOneProductById(req.params.pid))) {
      return res.status(400).json({ msg: "Product not found" });
    }

    if (
      cartDB.products.every(
        (prod) => prod.product.toString() != productDB._id.toString()
      )
    ) {
      return res.status(400).json({ msg: "Product is not in the cart" });
    }

    const cart = await updateProductInCart(
      req.params.cid,
      req.params.pid,
      req.body
    );
    res.json({ msg: "Product updated in Cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Eliminar un producto del carrito
export const deleteProductInCart = async (req, res) => {
  try {
    if (!(await findOneCart(req.params.cid))) {
      return res.status(400).json({ msg: "Cart not found" });
    }

    if (!(await findOneProductById(req.params.pid))) {
      return res.status(400).json({ msg: "Product not found" });
    }

    const cart = await deleteProductByIdInCart(req.params.cid, req.params.pid);
    res.json({ msg: "Product deleted in Cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar todos los productos del carrito
export const deleteProductsInCart = async (req, res) => {
  try {
    if (!(await findOneCart(req.params.cid))) {
      return res.status(400).json({ msg: "Cart not found" });
    }
    
    const cart = await deleteAllProductByIdInCart(req.params.cid);
    res.json({ msg: "Products deleted in Cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
