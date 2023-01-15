# DESAFIO 4

## Primera entrega del proyecto final.
<br>
<b>DESCRIPCION: </b>
Desarrollar un servidor que contenga los endpoints y servicios necesarios para gestionar los productos y carritos de compras de un e-commerce.
<br>
<br>
<b>Profesor:</b> Farid Sesin</br>
<b>Tutor:</b> Felipe Ramos</br>
<b>Alumno:</b> Alejandro Gomez Nieto</br>
<br>

## BASE URL

```PowerShell
localhost:8080
```

## ENDPOINTS

<b>PRODUCTOS</b>

```PowerShell
GET /api/products
GET /api/products/:pid
POST /api/products
PUT /api/products/:pid
DELETE /api/products/:pid
```

<b>PRODUCTO BODY</b>

```json
//CREAR PRODUCTO
//POST /api/products

{
  "title": "Producto",
  "description": "Producto",
  "price": 100,
  "thumbnail": ["imagen1", "imagen2"],
  "code": 1,
  "stock": 10,
  "category": "categoria",
  "status": true
}
```

<b>CARRITO</b>

```PowerShell
POST /api/carts/
GET /api/carts/:cid
POST /api/carts/:cid/products/:pid
```

<b>CARRITO BODY</b>

```json
//CREAR CARRITO
//POST /api/carts/

{

}
```
```json
//AGREGAR PRODUCTO AL CARRITO
//POST /api/carts/:cid/products/:pid

{
  "product": 2,
  "quantity": 1
}