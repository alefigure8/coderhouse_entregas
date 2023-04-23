import fs from "fs";
import { __dirname } from "../../../utils/path.js";

class MessageManager {
  constructor() {
    this.message;
    this.path = __dirname + "/persistencia/files/messages.json";
    this.id = 1;
  }

  #generateId() {
    return this.message.length != 0
      ? this.message[this.message.length - 1].id + 1
      : this.id;
  }

  async getMessages() {
    try {
      if (fs.existsSync(this.path)) {
        const messages = await fs.promises.readFile(this.path, "utf-8");
        this.message = await JSON.parse(messages);
        return this.message;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async addMessage(usuario, mensaje) {
    try {
      const newmsg = { usuario, mensaje };
      this.message = await this.getMessages();
      newmsg.id = this.#generateId();
      newmsg.fecha = new Date();
      this.message.push(newmsg);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.message, null, 2),
        "utf-8"
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default MessageManager;
