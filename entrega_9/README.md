# ENTREGA 9

## Descripción
Agregar modelo de usuario nuevo y modificar session por JWT

<br>

<b>Profesor:</b> Farid Sesin</br>
<b>Tutor:</b> Jerlib Gonzalez</br>
<b>Alumno:</b> Alejandro Gomez Nieto</br>
<br>

## INDICE

- [ENTREGA 9](#ENTREGA-9)
  - [VIEWS](#views)
    - [RUTAS VIEWS](#rutas-views)
    - [QUERYS VIEWS](#querys-views)
  - [USERS](#USERS)
    - [RUTAS USERS](#rutas-users)
  - [PRODUCTOS API](#productos-api)
    - [RUTAS PRODUCTOS API](#rutas-productos-api)
  - [CARRITO API](#carrito-api)
    - [RUTAS CARRITO API](#rutas-carrito-api)
  - [JSON BODY](#json-body)
    - [CREAR PRODUCTO](#crear-producto)
    - [CREAR CARRITO](#crear-carrito)
    - [AGREGAR PRODUCTOS](#agregar-productos)

## PORT
### RUTA BASE

```js
localhost:8080
```
## VIEWS
### RUTAS VIEWS

```js
//Producto
localhost:8080/

//Producto IO
localhost:8080/realtimeproducts

//Productos
localhost:8080/products

//Cart
localhost:8080/carts/:id

//Chat
localhost:8080/chat

//Login
localhost:8080/login

//Registro
localhost:8080/register

//Logout
localhost:8080/logout

// Error login
localhost:8080/errorlogin

// Error registro
localhost:8080/errorregistro
```

### QUERYS VIEWS
```js
// Titulo
GET /api/products?title=producto

//Precio
GET /api/products?price=100

//Codigo
GET /api/products?code=1

//Categoria
GET /api/products?category=categoria

//Status
GET /api/products?status=true

//Limite
GET /api/products?limit=10

//Paginacion
GET /api/products?page=1

//Ordenar
GET /api/products?sort='asc'/'desc

```

## USERS
### RUTAS USERS

```js
//Login
GET /auth/users/login

//Register
POST /auth/users/register

//Login y register con github
GET /auth/users/github

//callback github
GET /auth/users/callbackGithub

```

## PRODUCTOS API
### RUTAS PRODUCTOS API
```js
//Ver Productos
GET /api/products

//Crear Producto
POST /api/products

//Obtener Producto
GET /api/products/:id

//Actualizar Producto
PUT /api/products/:id

//Eliminar Producto
DELETE /api/products/:id
```
### Respuesta
  
```js
200 Ok
```


## CARRITO API
### RUTAS CARRITO API

```js
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
### Respuesta
  
```js
200 OK
```

## JSON BODY
#### Crear Producto

```js
POST /api/products
```	

```json
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
## CARRITO DE COMPRAS
#### Crear Carrito


```js
POST /api/products
```	

```json
{
  "product": <ID>,
  "quantity": <CANTIDAD>
}
```
### Respuesta
  
```js
200 OK
```
## AGREGAR PRODUCTOS
#### Agregar producto al carrito
```js
POST /api/carts/:cid
```	
#### Agregar arreglo de productos al carrito
```json
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
  ### Respuesta
  
```js
200 OK
```