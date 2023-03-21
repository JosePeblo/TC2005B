/*
Película (título, año, duración, encolor, presupuesto, nomestudio, idproductor)
Elenco (título, año, nombre, sueldo)
Actor (nombre, dirección, telefono, fechanacimiento, sexo)
Productor (idproductor, nombre, dirección, teléfono)
Estudio (nomestudio, dirección)
*/

/* El ingreso total recibido por cada actor, sin importar en cuantas películas haya participado. */

SELECT nombre, SUM(sueldo) AS 'Total Ingresos'
FROM elenco
GROUP BY nombre
ORDER BY sum(sueldo) DESC;

/* El monto total destinado a películas por cada Estudio Cinematográfico, durante la década de los 80's. */
SELECT P.titulo, sum(P.presupuesto + E.sueldo) AS 'monto total'
FROM pelicula P, elenco E
WHERE P.anio BETWEEN '1980-01-01' AND '1989-12-31' AND P.titulo = E.titulo AND P.anio = E.anio
GROUP BY E.nomestudio;

/* 
Nombre y sueldo promedio de los actores (sólo hombres) que reciben en promedio un pago superior a 
5 millones de dolares por película. 
*/

SELECT E.nombre, avg(suledo)
FROM elenco E, actor A
WHERE A.nombre = E.nombre AND A.sexo = 'm'
GROUP BY A.nombre
HAVING avg(suledo) > 5000000;

/* 
Título y año de producción de las películas con menor presupuesto. (Por ejemplo, la película de Titanic se 
ha producido en varias veces entre la lista de películas estaría la producción de Titanic y el año que fue 
filmada con menor presupuesto).
*/
CREATE VIEW minpresupuesto AS
SELECT titulo, anio, min(presupuesto)
FROM pelicula
GROUP BY titulo;

SELECT titulo, anio
FROM minpresupuesto;

/* Mostrar el sueldo de la actriz mejor pagada. */

SELECT sueldo
FROM elenco
WHERE sexo = 'f'
ORDER BY sueldo desc
LIMIT 1;
