import { mongoDB } from "../persistencia/mongoDB/dbConfig.js";
import { config } from "../utils/config.js";

// MONGOOSE MANAGERS
import CartMongo from "../persistencia/DAOs/cartsDAOs/cartsMongo.js";
import ProductsMongo from "../persistencia/DAOs/productsDAOs/productsMongo.js";
import UsersMongo from "../persistencia/DAOs/usersDAOs/usersMongo.js";

// FILES MANAGERS

export let usersDAOs;
export let productsDAOs;
export let cartsDAOs;

switch (config.persistemce) {
  case "Mongoose":
    {
      // Iniciamos managers
      usersDAOs = new UsersMongo();
      productsDAOs = new ProductsMongo();
      cartsDAOs = new CartMongo();

      // Iniciamos la conexion a la base de datos
      mongoDB();
    }
    break;
}
