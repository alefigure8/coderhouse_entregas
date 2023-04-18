import { mongoDB } from "../persistencia/mongoDB/dbConfig.js";
import { config } from "../utils/config.js";

// MONGOOSE MANAGERS
import CartMongo from "../persistencia/DAOs/cartsDAOs/cartsMongo.js";
import ProductsMongo from "../persistencia/DAOs/productsDAOs/productsMongo.js";
import UsersMongo from "../persistencia/DAOs/usersDAOs/usersMongo.js";

// FILES MANAGERS
import ProductFile from "../persistencia/DAOs/productsDAOs/productsFile.js";
import UserFile from "../persistencia/DAOs/usersDAOs/userFile.js";

export let usersDAOs;
export let productsDAOs;
export let cartsDAOs;

switch (config.persistence) {
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
  case "File":
  {
    productsDAOs = new ProductFile();
    usersDAOs = new UserFile();
    //TODO cartsDAOs = new CartFile();
  }
}
