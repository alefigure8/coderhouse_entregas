import { messagesDAOs } from "../persistencia/factory.js";

export const findAllMessages = async () => {
  try {
    const messages = await messagesDAOs.getMessages();
    return messages;
  } catch (error) {
    throw new Error(error);
  }
};

export const addMessage = async (usuario, mensaje) => {
  try {
    const message = await messagesDAOs.addMessage(usuario, mensaje);
    return message;
  } catch (error) {
    throw new Error(error);
  }
};
