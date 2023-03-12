import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import {helpers} from "./helpers/handlebars.js"
import {__dirname} from "./utils.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import dbConfig from "./dbConfig.js";
import dotenv  from "dotenv";
import passport from 'passport';
import './middlewares/passportStrategies.js';
import routerProducts from "./routes/router.products.js";
import routerCarts from "./routes/router.cart.js";
import routerViews from "./routes/router.views.js";
import routerUsers from "./routes/router.users.js";

// STORES SESSION
//import FileStore from "session-file-store";
import mongoStore from 'connect-mongo'

//CONFIGURACIONES
const app = express();
const PORT = 8080;
dotenv.config();
//const fileStore = FileStore(session);

//HANDLEBARS
app.engine("handlebars", handlebars.engine({
    helpers
}));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// SESSION FILE STORE
// app.use(session({
//   store: new fileStore({
//     path: __dirname + "/sessions",
//     logFn: function(){}
//   }),
//     // eslint-disable-next-line no-undef
//     secret: process.env.SESSION,
//     resave: false,
//     saveUninitialized: false,
//     cookie:{
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }))

// SESSION MONGO
app.use(session({
  store: new mongoStore({
    // eslint-disable-next-line no-undef
    mongoUrl: process.env.MONGO_URI
  }),
    // eslint-disable-next-line no-undef
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.initialize());
app.use(passport.session());

//RUTAS
app.use("/", routerViews);
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
//app.use("/api/users", routerUsers);
app.use("/auth/users", routerUsers);

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
