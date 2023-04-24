import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        trim: true
    },
    purcharse_datetime: {
        type: Date,
        default: Date.now
    },
    amount:{
        type: Number
    },
    purcharser:{
        type: String,
        required: true
    }
})

export const ticketModel = mongoose.model("Tickets", ticketSchema);