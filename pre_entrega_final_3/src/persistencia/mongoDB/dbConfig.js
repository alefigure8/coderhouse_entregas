import mongoose from 'mongoose';
import {config} from '../../utils/config.js';

// CONEXION A LA BASE DE DATOS

export const mongoDB = async() =>{
    try {
        await mongoose.connect(config.mongoUrl);
        console.log('Database connected!');
    } catch (error) {
        console.log(error);
    }
}
