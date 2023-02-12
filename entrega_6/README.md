# DESAFIO 6

## Descripción
Configurar nuestro proyecto para que trabaje con Systemfile y MongoDB.
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

<b>VIEWS</b>

```json
//Producto
localhost:8080/

//Producto IO
localhost:8080/realtimeproducts

//Chat
localhost:8080/chat
```

<b>PRODUCTOS</b>

```json
//Crear producto IO
POST/realtimeproducts
```

<b>CARRITO</b>

```json
//Crear carrito
POST/api/carts/

//Obtener carrito
GET/api/carts/:id

//Obtener productos del carrito
GET/api/carts/:id/products

//Agregar producto al carrito
POST/api/carts/:id/product/:id

//Eliminar producto del carrito
DELETE/api/carts/:id/product/:id

//Actualizar producto del carrito
PUT/api/carts/:id/product/:id

//Eliminar carrito
DELETE/api/carts/:id
```

<b>PRODUCTO BODY PARA POSTMAN</b>

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
<b>CARRITO BODY PARA POSTMAN</b>

```json
//AGREGAR PRODUCTO AL CARRITO
//POST /api/products

{
  "product": <ID>,
  "quantity": <CANTIDAD>
}
```