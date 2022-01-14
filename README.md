# Buscador de patrones de ajedrez

Aplicación web para buscar patrones de una base de datos PGN.
![prev1](https://user-images.githubusercontent.com/42386896/149532965-e9704f4b-226b-404d-b919-aa95529c353c.png)


## Dependecias
- npm

## Ejecución
`npm install`

`npm start`

La aplicación estará corriendo en `localhost:3000`

## Notación de los patrones
Cada patrón se especifica en cada línea donde pueden ser dos tipos de patrones:
- Piezas fijas. Una pieza en una determinada casilla.

- Piezas atacantes. Una pieza que está atacando a una determinada casilla.

Todas las piezas deben ser espicificada por la inical de su nombre en inglés. Si la pieza en blanca se escribe en mayúsculas,
si es negra en minúsculas. Por ejemplo, si se quiere las partidas donde un caballo blanco esté en la casilla f3 sería:

`Nf3`

Un alfil negro en c3:

`bc3`

Para las piezas atacantes se especifica la pieza seguido de `->` y luego la casilla que esté atacando.


Por ejemplo, un alfil blanco que ataque la casilla h7:

`B->h7`

Un caballo negro que ataque la casilla c3:

`n->c3`

## Carga de base de datos y visualizador de partidas

Al cargar la primera vez siempre se carga una pequeña base de datos pero se puede cambiar subiendo otro archivo.

https://user-images.githubusercontent.com/42386896/149533003-a47ed5a5-2b92-429b-9ed4-aa24f8c1f0ea.mov



## Busqueda de patrones global y por partida

Se puede buscar el patrón en todas las partidas con el botón de `Buscar patrón`.
Para buscar el patrón en una partida se tiene que seleccionar e ir buscando jugada por jugada manualmente, 
si el patrón se encuentra en la jugada actual se mostrará en el mensaje.

https://user-images.githubusercontent.com/42386896/149533101-6813e8ff-b80b-4159-b5c8-0b9e67d57d0e.mov


## Rendimiento
La búsqueda está optmizada para que primero busque los patrones de piezas fijas y después los de piezas atacantes.
De esta forma si una posición no cumple con los patrones de piezas fijas no tiene caso buscar los patrones de piezas atacantes.
Esto porque la búsqueda de piezas fijas es mucho más rápida que la de piezas atacantes. En la primera solo se compara las dos posiciones fen,
mientras que la segunda hay que calcular donde está la pieza y hacia donde está atacando. Por lo que la búsqueda es más rápida cuando 
hay patrones de piezas fijas y es más lenta cuando solo hay patrones de piezas atacantes.




