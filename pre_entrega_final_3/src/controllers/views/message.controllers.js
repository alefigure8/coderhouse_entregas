import { Router } from "express";
import {io} from '../../app.js';
import {
  addMessage,
  findAllMessages,
} from "../../services/message.services.js";

const router = Router();

export const getChat = async (req, res) => {
  try {
    const user = res.user;
    if(user){
      const messages = await findAllMessages();
    io.on("connection", (socket) => {
      socket.emit("messages", messages);
    });
    res.render("chat", { user, titulo: "CHAT" });
    } else {
      
      res.redirect("/login");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CHAT ENVIAR MENSAJES
export const postChat = async (req, res) => {
  const user = res.user;
  try {
    if(!user.isAdmin && user){
      const { usuario, mensaje } = req.body;

    await addMessage(usuario, mensaje);

    const messages = await findAllMessages();
    io.sockets.emit("messages", messages);
    
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default router;
