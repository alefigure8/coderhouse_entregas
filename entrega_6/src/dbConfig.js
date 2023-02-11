import mongoose from 'mongoose';

//VARIABLE DE ENTORNO
const URI = 'mongodb+srv://admin:pago7611@cluster0.62nsj.mongodb.net/ecommerce';

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