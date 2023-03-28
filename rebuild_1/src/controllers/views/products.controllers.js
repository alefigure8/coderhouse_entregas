import {
    findAllProducts,
    findOneProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  } from "../../services/products.services.js";
  
  export async function getProducts(req, res) {
    try {
      const products = await findAllProducts(req.query);
      res.render("products", { products, titulo: "PRODUCTOS" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  export async function getProduct(req, res) {
    try {
      const product = await findOneProductById(req.params.id);
      res.render("product", { product, titulo: product.title });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  export async function postProduct(req, res) {
    try {
      if (
        Object.values(req.body).includes("") ||
        Object.values(req.body).includes(undefined)
      ) {
        return res.status(500).redirect('/products');
      }
  
      await addProduct(req.body);
      res.status(200).redirect('/products');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  export async function putProduct(req, res) {
    try {
      if (
        Object.values(req.body).includes("") ||
        Object.values(req.body).includes(undefined)
      ) {
        return res.status(500).redirect('/products');
      }
  
      await updateProduct(req.params.id, req.body);
      res.status(200).redirect('/products');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  export async function deleteProductById(req, res) {
    try {
      await deleteProduct(req.params.id);
      res.status(200).redirect('/products');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  