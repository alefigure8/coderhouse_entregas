import {ticketsDAOs} from '../persistencia/factory.js'

export const addTicket = async (ticket) => {
    try {
        const newTicket = await ticketsDAOs.addTicket(ticket);
        return newTicket;
    } catch (error) {
        throw new Error(error);
    }
}

export const getOneTicket = async (mail) => {
    try {
        const ticket = await ticketsDAOs.getOneTicket(mail);
        return ticket;
    } catch (error) {
        throw new Error(error);
    }
}