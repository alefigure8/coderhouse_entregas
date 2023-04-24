import {ticketModel} from '../../mongoDB/model/Ticket.model.js'

class TicketsManager {
    async addTicket(ticket){
        try {
            const newTicket = ticketModel.create(ticket);
            return newTicket;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getOneTicket(mail){
        try {
            const ticket = await ticketModel.findOne({purcharser: mail}).lean();
            return ticket;
        } catch (error) {
            throw new Error(error);
        }
    }

}

export default TicketsManager;