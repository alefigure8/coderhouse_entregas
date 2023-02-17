import mongoose from 'mongoose';
import dotenv  from "dotenv";
dotenv.config();

//VARIABLE DE ENTORNO
// eslint-disable-next-line no-undef
const URI = process.env.MONGO_URI;

// CONEXION A LA BASE DE DATOS
const dbConfig = async () => {
    try {
        await mongoose.connect(URI);
        console.log('La base de datos se ha conectado');
    } catch (error) {
        console.log(error);
    }
}

export default dbConfig;