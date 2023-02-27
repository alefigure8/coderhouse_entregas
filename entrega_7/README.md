# ENTREGA 7

## Descripción
Implementación de login y registro de usuarios, y persistencia de datos en MongoDB.

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

```powershell
//Producto
localhost:8080/

//Producto IO - RUTA PROTEGIDA
localhost:8080/realtimeproducts

//Productos
localhost:8080/products

//Cart - RUTA PROTEGIDA
localhost:8080/carts/:id

//Chat
localhost:8080/chat

//Login
localhost:8080/login

//Registro - RUTA PROTEGIDA
localhost:8080/register

//Logout
localhost:8080/logout

// Error login
localhost:8080/errorlogin

// Error registro
localhost:8080/errorregistro
```

```

<b>QUERYS</b>
```powershell
//Crear producto IO
GET/api/products

//Querys
GET/api/products?title=producto
GET/api/products?price=100
GET/api/products?code=1
GET/api/products?category=categoria
GET/api/products?status=true
GET/api/products?limit=10
GET/api/products?opage=1
GET/api/products?sort='asc'/'desc

```

<b>PRODUCTO API</b>
```powershell
//Ver Productos
GET/api/products

//Crear Producto
//POST /api/products

//Obtener Producto
GET/api/products/:id

//Actualizar Producto
PUT/api/products/:id

//Eliminar Producto
DELETE/api/products/:id
```

<b>CARRITO API</b>

```powershell
//Crear carrito
POST/api/carts/

//Obtener carrito
GET/api/carts/:cid

// Agregar arreglo de productos al carrito
PUT /api/carts/:cid

//Obtener productos del carrito
GET/api/carts/:cid/products

//Agregar producto al carrito
POST/api/carts/:cid/product/:pid

//Actualizar producto del carrito
PUT/api/carts/:cid/product/:pid

//Eliminar producto del carrito
DELETE/api/carts/:cid/product/:pid

//Eliminar carrito
DELETE/api/carts/:cid

//Vaciar carrito
DELETE/api/carts/:cid/product
```

<b>PRODUCTO BODY PARA POSTMAN</b>

```powershell
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

```powershell
//AGREGAR PRODUCTO AL CARRITO
//POST /api/products

{
  "product": <ID>,
  "quantity": <CANTIDAD>
}
```
```powershell
//AGREGAR ARREGLO DE PRODUCTO AL CARRITO
//POST /api/carts/:cid
  [
    {
      "product":"63e7ea72653668f3ec4cff30",
      "quantity": 1
    },
    {
      "product": "63e7ec24653668f3ec4cff3b",
      "quantity": 2
    }
  ]
  ```