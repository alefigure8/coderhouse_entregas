import mongoose from 'mongoose';
import dotenv  from "dotenv";
dotenv.config();

//VARIABLE DE ENTORNO
// eslint-disable-next-line no-undef
const URI = `mongodb+srv://admin:${process.env.MONGO_PASS}@cluster0.62nsj.mongodb.net/ecommerce`;

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