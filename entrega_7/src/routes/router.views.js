import { Router } from "express";
import io from "../app.js";
import { auth } from "../middlewares/auth.js";

// ****** PERSISTENCIA DE DATOS ****** //

/* FILE SYSTEM*/
//import ProductManager from "../dao/fileManagers/ProductManager.js";

/* MONGO */
import ProductManager from "../dao/mongoManagers/ProductManager.js";
import CartManager from "../dao/mongoManagers/CartManager.js";
import MessageManeger from "../dao/mongoManagers/MessageManeger.js";

const router = Router();

//DATOS DESDE HANDLEBARS
router.get("/", async (req, res) => {
  res.redirect("/products");
});

//DATOS DESDE SOCKET.IO
router.get("/realtimeproducts", auth, async (req, res) => {
  try {
    const user = res.user;
    if(user.isAdmin){
      const productManager = new ProductManager();

      // Obtener data
      const productos = await productManager.getViewProducts();
  
      // Enviar data al cliente
      io.on("connection", (socket) => {
        socket.emit("productos", productos);
      });
  
      // Renderizar vista
      res.render("realTimeProducts", { user, titulo: "PRODUCTOS.IO" });
    }
    else {
      res.redirect("/login");
    }
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
    const productos = await productManager.getProducts({});

    // Enviar data al cliente
    io.sockets.emit("productos", productos.docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CHAT MENSAJES
router.get("/chat", auth, async (req, res) => {
  try {
    const user = res.user;
    const messageManeger = new MessageManeger();
    const messages = await messageManeger.getMessages();
    io.on("connection", (socket) => {
      socket.emit("messages", messages);
    });
    res.render("chat", { user, titulo: "CHAT" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CHAT ENVIAR MENSAJES
router.post("/chat", async (req, res) => {
  try {
    const messageManeger = new MessageManeger();
    const { usuario, mensaje } = req.body;
    await messageManeger.addMessage(usuario, mensaje);
    const messages = await messageManeger.getMessages();
    io.sockets.emit("messages", messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

//VISTA LISTADO DE PRODUCTOS DESDE HANDLEBARS PAGINACION
router.get("/products", auth, async (req, res) => {
  try {
    const user = res.user;
    const productManager = new ProductManager();
    const productos = await productManager.getProducts(req.query);
    res.render("products", { user, productos, titulo: "PRODUCTOS" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//VISTA PRODUCTO DESDE HANDLEBARS
router.get("/product/:id", auth, async (req, res) => {
  try {
    const user = res.user;
    const id = req.params.id;
    const productManager = new ProductManager();
    const product = await productManager.getProductById(id);
    res.render("product", { user, product, titulo: product.title });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//CARRITO
router.get("/carts/:id", auth, async (req, res) => {
  try {
    const user = res.user;
    if (user) {
      const id = req.params.id;
      const cartsManager = new CartManager();
      const cart = await cartsManager.getCartById(id);
      cart[0].products.forEach((x) => (x.idCart = id));
      res.render("carts", {
        user,
        idCart: id,
        cart: cart[0].products,
        titulo: "CARRITO",
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//CREAR PRODUCTO EN CARRITO
router.post("/:cid/product/:pid", auth, async (req, res) => {
  try {
    const user = res.user;
    if (user) {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const { quantity } = req.body;
      console.log(cid, pid, quantity);
      const cartManager = new CartManager();
      await cartManager.updateCart(cid, pid, quantity);
      res.redirect(`/carts/${cid}`);
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.status(400).json({ status: "error", error: "Ocurrió un error" });
  }
});

//ACTUALIZAR CANTIDAD EN CARRITO
router.put(":cid/product/:pid", auth, async (req, res) => {
  try {
    const user = res.user;
    if (user) {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const { quantity } = req.body;
      const cartManager = new CartManager();
      await cartManager.updateProduct(cid, pid, quantity);
      res.redirect(`/carts/${cid}`);
    }
  } catch (error) {
    res.status(400).json({ status: "error", error: "Ocurrió un error" });
  }
});

// DELETE PRODUCTO DE UN CARRITO
router.delete("/:cid/product/:pid", auth, async (req, res) => {
  try {
    const user = res.user;
    if (user) {
      const cartManager = new CartManager();
      const cid = req.params.cid;
      const pid = req.params.pid;
      await cartManager.deleteProduct(cid, pid);
      res.redirect(`/carts/${cid}`);
    }
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// DELETE CARRITO
router.delete("/:cid/", auth, async (req, res) => {
  try {
    const user = res.user;
    if (user) {
      const cartManager = new CartManager();
      const cid = req.params.cid;
      await cartManager.deleteCart(cid);
      res.redirect("/products/");
    }
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

//REGISTER
router.get("/register", auth, (req, res) => {
  const user = res.user;
  if (!user) {
    res.render("register", { titulo: "REGISTRO" });
  } else {
    res.redirect("/profile");
  }
});

//LOGIN
router.get("/login", auth, (req, res) => {
  const user = res.user;
  if (!user) {
    res.render("login", { titulo: "LOGIN" });
  } else {
    res.redirect("/profile");
  }
});

// PROFILE
router.get("/profile", auth, async (req, res) => {
  const user = res.user;
  if (user) {
    res.render("profile", { user, titulo: "PROFILE" });
  } else {
    res.redirect("/login");
  }
});

//ERROR REGISTRO
router.get("/errorRegister", (req, res) => {
  res.render("errorRegister");
});

//ERROR LOGIN
router.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});
