# DESAFIO 5

## Primera entrega del proyecto final.
<br>
<b>DESCRIPCION: </b>
Configurar nuestro proyecto para que trabaje con Handlebars y websocket.
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
GET/
GET/realtimeproducts
POST/realtimeproducts
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