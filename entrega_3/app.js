import express from 'express';
import ProductManager  from './ProductManager.js';

//CONFIGURACIONES
const app = express();
const PORT = 8080;

//ROUTES
app.get('/', (req, res)=>{
    try {
        res.status(200).send(
            '<html>' +
            '<head>' +
            '<title>CODERHOUSE | DESAFIO 3</title>' +
            '<link rel="icon" type="image/x-icon" href="https://us.coderhouse.com/favicon.png">' +
            '</head>' +
            '<h1>Coderhouse - Desafio 3</h1>' +
            '<h2>Servidor con Express</h2>' +
            '<p><b>Profesor:</b> Farid Sesin</p>' +
            '<p><b>Tutor:</b> Felipe Ramos</p>' +
            '<p><b>Alumno:</b> Alejandro Gomez Nieto</p>' +
            '</br>' +
            '<h3>Endpoints</h3>' +
            '<ul>' +
            '<li>Listar todos los productos: <a href="/products">"/products"</a> </li>' +
            '<li>Listar productos con Query: <a href="/products/?limit=5">"/products/?limit=5"</a></li>' +
            '<li>istar productos por id: <a href="/products/1">"/products/1"</a></li>' +
            '</body>' +
            '</html>'
        );
    } catch (error) {
        res.status(400).send({error: 'Error'});
    }
})

app.get('/products', async (req, res)=>{
    try {
        const limit = req.query.limit;
        const productos = new ProductManager();
        const listaProductos = await productos.getProducts();

        if(limit){
            res.status(200).send(listaProductos.slice(0, limit));
        } else{
            res.status(200).send(listaProductos);
        }
    } catch (error) {
        res.status(400).send({error: 'No hay productos cargados'});
    }
})

app.get('/products/:pid', async (req, res)=>{
    try {
        const pid = parseInt(req.params.pid);
        const productos = new ProductManager();
        const listaProductos = await productos.getProductById(pid);
        res.status(200).send(listaProductos);
    } catch (error) {
        res.status(400).send({error: 'Producto no encontrado'});
    }
})

//SERVER
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
})

server.on('error', error => {
    console.log('Error en el servidor:', error);
})

