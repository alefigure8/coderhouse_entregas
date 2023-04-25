import { mongoDB } from "../persistencia/mongoDB/dbConfig.js";
import { config } from "../utils/config.js";

// MONGOOSE MANAGERS
import CartMongo from "../persistencia/DAOs/cartsDAOs/cartsMongo.js";
import ProductsMongo from "../persistencia/DAOs/productsDAOs/productsMongo.js";
import UsersMongo from "../persistencia/DAOs/usersDAOs/usersMongo.js";
import MessageMongo from "../persistencia/DAOs/messageDAOs/messagesMongo.js";
import TicketMongo from "../persistencia/DAOs/ticketsDATOs/ticketsMongo.js";


// FILES MANAGERS
import ProductFile from "../persistencia/DAOs/productsDAOs/productsFile.js";
import UserFile from "../persistencia/DAOs/usersDAOs/userFile.js";
import CartFile from "../persistencia/DAOs/cartsDAOs/cartsFile.js";
import MessageFile from "../persistencia/DAOs/messageDAOs/messageFile.js";
import TicketFile from "../persistencia/DAOs/ticketsDATOs/ticketsFile.js";

export let usersDAOs;
export let productsDAOs;
export let cartsDAOs;
export let messagesDAOs;
export let ticketsDAOs;

switch (config.persistence) {
  case "Mongoose":
    {
      // Iniciamos managers
      usersDAOs = new UsersMongo();
      productsDAOs = new ProductsMongo();
      cartsDAOs = new CartMongo();
      messagesDAOs = new MessageMongo();
      ticketsDAOs = new TicketMongo();

      // Iniciamos la conexion a la base de datos
      mongoDB();
    }
    break;
  case "File":
  {
    productsDAOs = new ProductFile();
    usersDAOs = new UserFile();
    cartsDAOs = new CartFile();
    messagesDAOs = new MessageFile();
    ticketsDAOs = new TicketFile();
  }
}
