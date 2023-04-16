import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
    usuario:{
        type: String,
        required: true
    },
    mensaje:{
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now
    }
})
export const messagesModel = mongoose.model("Messages", messageSchema);