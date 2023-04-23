import { messagesModel } from '../../mongoDB/model/Messages.model.js';

class MessageManeger{
    constructor(){
        this.messages = [];
    }
    async getMessages(){
        try{
            this.messages = await messagesModel.find().lean();
            console.log(this.messages)
            return this.messages;
        }catch(error){
            throw new Error(error);
        }
    }
    async addMessage(usuario, mensaje){
        try{
            await messagesModel.create({usuario, mensaje});
            this.messages.push({usuario, mensaje, fecha: new Date()});
            return this.messages;
        }catch(error){
            throw new Error(error);
        }
    }
}

export default MessageManeger;