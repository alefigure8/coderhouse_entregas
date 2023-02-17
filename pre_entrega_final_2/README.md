# PRE-ENTREGA FINAL 2

## Descripción
Segunda pre-entrega del proyecto final

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

//Producto IO
localhost:8080/realtimeproducts

//Cart
localhost:8080/carts/:id

//Chat
localhost:8080/chat
```

<b>PRODUCTOS VIEW</b>

```powershell
//Crear producto IO
POST/realtimeproducts
```
<b>PRODUCTOS API</b>
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

<b>CARRITO</b>

```powershell
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