import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import {__dirname} from "./utils.js";
import dbConfig from "./dbConfig.js";
import routerProducts from "./routes/router.products.js";
import routerCarts from "./routes/router.cart.js";
import routerViews from "./routes/router.views.js";

//CONFIGURACIONES
const app = express();
const PORT = 8080;

//HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//RUTAS
app.use("/", routerViews);
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

//PUBLIC
app.use(express.static(__dirname + "/public"));

//INICIAR BASE DE DATOS
dbConfig();

//INICIAR SERVIDOR
const serverHTTP = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

//MANEJO DE ERRORES
serverHTTP.on("error", (error) => {
  console.log(`Error en servidor ${error}`);
});

//SOCKET
const io = new Server(serverHTTP);

io.on("connection", (socket) => {
  // Conexión del cliente
  console.log("Nuevo cliente conectado: ", socket.id);

  // Desconexión del cliente
  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });
});

export default io;
