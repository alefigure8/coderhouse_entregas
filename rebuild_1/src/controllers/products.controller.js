import {
  findAllProducts,
  findOneProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/products.services.js";

export async function getProducts(req, res) {
  try {
    const products = await findAllProducts(req.query);
    res.json({ msg: "Products", products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProduct(req, res) {
  try {
    const product = await findOneProductById(req.params.id);
    res.json({ msg: "Product", product });
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
      return res.status(500).json({ error: "All fields are required" });
    }

    const product = await addProduct(req.body);
    res.json({ msg: "Product added", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function putProduct(req, res) {
  try {
    //Validar datos
    const product = await updateProduct(req.params.id, req.body);
    res.json({ msg: "Product updated", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteProductById(req, res) {
  try {
    const product = await deleteProduct(req.params.id);
    res.json({ msg: "Product deleted", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
