# Estilo-Rustico-API-MongoDB

END POINTS de la API

1)Para registrar un Usuario
POST /auth/register
Enviar en el body un JSON con los siguientes campos: { "nombre": string, "email": string, "password": string }
Retorna la información del usuario registrado.


2)Para hacer un login
POST /auth/login
Enviar en el body un JSON con los siguientes campos: { "email": string, "password": string }
Retorna la información del usuario logueado y el JSON Web Token asignado para el usuario en esta sesión.
El JWT es requerido en algunas peticiones

3)Para obtener las ordenes
GET /orders
Enviar en el header el JWT del usuario logueado. ( {"x-token": token} )
Retorna un array de objetos con las ordenes realizadas

4)Para crear una orden nueva
POST /orders
Enviar en el header el JWT del usuario logueado. ( {"x-token": token} )
Enviar en el body un JSON con los siguientes campos:
"price": Suma del costo de los productos
"shippingCost": Costo de envío
"total": Suma de los dos anteriores
"shippingDetails": Datos obtenidos del form unicado en el checkout
"items": Array de objetos donde cada objeto es un producto de nuestro carrito
