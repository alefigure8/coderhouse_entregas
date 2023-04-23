import { mongoDB } from "../persistencia/mongoDB/dbConfig.js";
import { config } from "../utils/config.js";

// MONGOOSE MANAGERS
import CartMongo from "../persistencia/DAOs/cartsDAOs/cartsMongo.js";
import ProductsMongo from "../persistencia/DAOs/productsDAOs/productsMongo.js";
import UsersMongo from "../persistencia/DAOs/usersDAOs/usersMongo.js";
import MessageManeger from "../persistencia/DAOs/messageDAOs/messagesMongo.js";

// FILES MANAGERS
import ProductFile from "../persistencia/DAOs/productsDAOs/productsFile.js";
import UserFile from "../persistencia/DAOs/usersDAOs/userFile.js";
import CartFile from "../persistencia/DAOs/cartsDAOs/cartsFile.js";
// import MessageManager from files

export let usersDAOs;
export let productsDAOs;
export let cartsDAOs;
export let messagesDAOs;

switch (config.persistence) {
  case "Mongoose":
    {
      // Iniciamos managers
      usersDAOs = new UsersMongo();
      productsDAOs = new ProductsMongo();
      cartsDAOs = new CartMongo();
      messagesDAOs = new MessageManeger();

      // Iniciamos la conexion a la base de datos
      mongoDB();
    }
    break;
  case "File":
  {
    productsDAOs = new ProductFile();
    usersDAOs = new UserFile();
    cartsDAOs = new CartFile();
    // messagesDAOs = new MessageManager();
  }
}
