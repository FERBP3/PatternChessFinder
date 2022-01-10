# Buscador de patrones de ajedrez

Aplicación web para buscar patrones de una base de datos PGN.
![patternFinder_preview](https://user-images.githubusercontent.com/42386896/148709450-c1434d77-e7b4-4b74-bbc5-ceb809da126c.png)


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

https://user-images.githubusercontent.com/42386896/148709999-ebcdcd9a-7bd0-4303-8cf7-d7d0bdee6146.mov

## Busqueda de patrones global y por partida

Se puede buscar el patrón en todas las partidas con el botón de `Buscar patrón`.
Para buscar el patrón en una partida se tiene que seleccionar e ir buscando jugada por jugada manualmente, 
si el patrón se encuentra en la jugada actual se mostrará en el mensaje.

https://user-images.githubusercontent.com/42386896/148710055-02865b3f-dce5-455e-9f03-a7b21957d88a.mov

## Bugs
- En ocasiones al buscar el patrón globalmente no aparece el símbolo de carga (Spinner)
pero internamente sí se está buscando solo hay que esperar a que el resultado aparezca en la tabla correspondiente.



