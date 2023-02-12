import { messagesModel } from "../model/Messages.model.js";

class MessageManeger{
    constructor(){
        this.messages = [];
    }
    async getMessages(){
        try{
            const messages = await messagesModel.find().lean();
            return messages;
        }catch(error){
            throw new Error(error);
        }
    }
    async addMessage(usuario, mensaje){
        try{
            const newMessage = await messagesModel.create({usuario, mensaje});
            return newMessage;
        }catch(error){
            throw new Error(error);
        }
    }
}

export default MessageManeger;