import { Router } from "express";
import io from "../app.js";

/* FILE SYSTEM*/
//import ProductManager from "../dao/fileManagers/ProductManager.js";

/* MONGO */
import ProductManager from "../dao/mongoManagers/ProductManager.js";
import MessageManeger from "../dao/mongoManagers/MessageManeger.js";

const router = Router();

//DATOS DESDE HANDLEBARS
router.get("/", async (req, res) => {
  try {
    const productManager = new ProductManager();
    const productos = await productManager.getProducts();
    res.render("home", { productos, titulo:"PRODUCTOS" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DATOS DESDE SOCKET.IO
router.get("/realtimeproducts", async (req, res) => {
  try {
    const productManager = new ProductManager();

    // Obtener data
    const productos = await productManager.getProducts();

    // Enviar data al cliente
    io.on("connection", (socket) => {
      socket.emit("productos", productos);
    });

    // Renderizar vista
    res.render("realTimeProducts", {titulo:"PRODUCTOS.IO"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//POST DESDE SOCKET.IO
router.post("/realtimeproducts", async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock, category } =
      req.body;

    const productManager = new ProductManager();

    // Agregar producto
    await productManager.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category
    );

    // Obtener data
    const productos = await productManager.getProducts();

    // Enviar data al cliente
    io.sockets.emit("productos", productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/chat', async (req, res)=>{
  try {
    const messageManeger = new MessageManeger();
    const messages = await messageManeger.getMessages();
    io.on("connection", (socket) => {
      socket.emit("messages", messages);
    });
    res.render("chat", { titulo:"CHAT" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/chat', async (req, res)=>{
  try {
    const { usuario, mensaje } = req.body;
    const messageManeger = new MessageManeger();
    await messageManeger.addMessage(usuario, mensaje);
    const messages = await messageManeger.getMessages();
    io.sockets.emit("messages", messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

export default router;
