import { Router } from "express";

/* FILE SYSTEM*/
//import ProductManager from "../dao/fileManagers/ProductManager.js";

/* MONGO */
import ProductManager from "../dao/mongoManagers/ProductManager.js";

const router = Router();

// VER TODOS LOS PRODUCTOS
router.get("/", async (req, res) => {
  try {
    const productManager = new ProductManager();
    const listaProductos = await productManager.getProducts();
    res.status(200).json({ status: "success", payload: listaProductos });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// VER UN PRODUCTO
router.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const productManager = new ProductManager();
    const producto = await productManager.getProductById(id);
    res.status(200).json({ status: "success", payload: producto });
  } catch (error) {
    res.status(400).json({ status: "error", error: "Ocurrió un error" });
  }
});

// CREAR UN PRODUCTO
router.post('/', async (req, res)=>{
    try {
        const {title, description, price, thumbnail, code, stock, category, status} = req.body;
        const productManager = new ProductManager();
        const productoAgregado = await productManager.addProduct(title, description, price, thumbnail, code, stock, category, status);
        res.status(200).json({status: "success", payload: productoAgregado});
    } catch (error) {
        res.status(400).json({ status: "error", error: "Ocurrió un error" });
    }
})

// ACTUALIZAR UN PRODUCTO
router.put('/:pid', async (req, res)=>{
    try {
        const pid = req.params.pid;
        const {title, description, price, thumbnail, code, stock, category, status} = req.body;
        const productManager = new ProductManager();
        const productoAgregado = await productManager.updateProduct(pid, title, description, price, thumbnail, code, stock, category, status);
        res.status(200).json({status: "success", payload: productoAgregado});
    } catch (error) {
        res.status(400).json({ status: "error", error: "Ocurrió un error" });
    }
});

// ELIMINAR UN PRODUCTO
router.delete('/:pid', async (req, res)=>{
    try {
        const id = req.params.pid;
        const productManager = new ProductManager();
        const productoEliminado = await productManager.deleteProduct(id);
        res.status(200).json({status: "success", payload: productoEliminado});
    } catch (error) {
        res.status(400).json({ status: "error", error: "Ocurrió un error" });
    }
});

export default router;
