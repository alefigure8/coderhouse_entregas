import express from "express";
import routerProducts from "./routes/router.products.js";
import routerCart from "./routes/router.cart.js";

//CONFIGURACIONES
const app = express();
const PORT = 8080;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//RUTAS
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);

//INICIAR SERVIDOR
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

//MANEJO DE ERRORES
server.on("error", (error) => {
    console.log(`Error en servidor ${error}`);
});
