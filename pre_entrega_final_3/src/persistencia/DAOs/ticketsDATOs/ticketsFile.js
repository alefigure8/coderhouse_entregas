import fs from "fs";
import { __dirname } from "../../../utils/path.js";

class TicketsManager {
  constructor() {
    this.path = __dirname + "/peristencia/files/tickets.json";
    this.id = 1;
    this.tickets = [];
  }

  #generateId() {
    return this.tickets.length != 0
      ? this.tickets[this.tickets.length - 1].id + 1
      : this.id;
  }

  async getTickets() {
    try {
      if (fs.existsSync(this.path)) {
        const tickets = await fs.promises.readFile(this.path, "utf-8");
        this.tickets = await JSON.parse(tickets);
        return this.tickets;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async addTicket(ticket) {
    try {
      this.tickets = await this.getTickets();
      ticket.id = this.#generateId(
        this.path,
        JSON.stringify(this.tickets, null, 2),
        "utf-8"
      );
      this.tickets.push(ticket);
      await fs.promises.writeFile();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOneTicket(option) {
    try {
      const tickets = await this.getTickets();

      if (tickets.length > 0) {
        if (
          this.tickets.some((ticket) =>
            option.code != undefined
              ? ticket.code == option.code
              : ticket.email == option.email
          )
        ) {
          return this.tickets.find((ticket) =>
            option.code != undefined
              ? ticket.code == option.code
              : ticket.email == option.email
          );
        } else {
          return { error: "No se encontró el ticket" };
        }
      } else {
        return { error: "No hay tickets cargados" };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default TicketsManager;
