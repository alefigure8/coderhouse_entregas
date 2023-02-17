import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: [{
        type: String,
    }],
    code: {
        type: String,
        unique: true,
        trim: true,
        index: true,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

productSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model("Products", productSchema);