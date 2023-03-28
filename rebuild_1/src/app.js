import express from "express";
import { __dirname } from "././utils/path.js";
import { config } from "./utils/config.js";
import cookieParser from "cookie-parser";

import "./dbConfig.js";

import handlebars from "express-handlebars";
import { helpers } from "./helpers/handlebars.js";

import productsRoute from "./routes/products.route.js";
import usersRoute from "./routes/users.route.js";
import cartsRoute from "./routes/carts.route.js";
import viewsRoute from "./routes/views.route.js";

//CONFIGURACIONES
const app = express();

//PUBLIC
app.use(express.static(__dirname + "/public"));

//HANDLEBARS
app.engine(
  "handlebars",
  handlebars.engine({
    helpers,
  })
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
console.log(__dirname + "/views");

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.cookieSecret));

//ROUTES API
app.use("/api/products", productsRoute);
app.use("/api/users", usersRoute);
app.use("/api/carts", cartsRoute);

// ROUTES VIEWS
app.use("/", viewsRoute);

//INICIAR SERVIDOR
const serverHTTP = app.listen(config.port, () => {
  console.log(`Server listen on port ${config.port}`);
});

//MANEJO DE ERRORES
serverHTTP.on("error", (error) => {
  console.log(`Server error: ${error}`);
});
