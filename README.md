# Buscador de patrones de ajedrez

Aplicación web para buscar patrones de una base de datos PGN.

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


