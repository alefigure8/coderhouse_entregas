import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import {helpers} from "./helpers/handlebars.js"
import {__dirname} from "./utils.js";
import cookieParser from "cookie-parser";
// import session from "express-session";
import dbConfig from "./dbConfig.js";
import dotenv  from "dotenv";
import passport from 'passport';
import './middlewares/passportStrategies.js';
import routerProducts from "./routes/router.products.js";
import routerCarts from "./routes/router.cart.js";
import routerViews from "./routes/router.views.js";
import routerUsers from "./routes/router.users.js";
import routerSession from "./routes/router.session.js";

//CONFIGURACIONES
const app = express();
const PORT = 8080;
dotenv.config();

//HANDLEBARS
app.engine("handlebars", handlebars.engine({
    helpers
}));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// eslint-disable-next-line no-undef
app.use(cookieParser( process.env.COOKIE_SECRET ));
app.use(passport.initialize());

//RUTAS
app.use("/", routerViews);
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/auth/users", routerUsers);
app.use("/api/session", routerSession);

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

  socket.on('newUser', user => {
    socket.broadcast.emit('broadcast', user);
  })
});

export default io;
