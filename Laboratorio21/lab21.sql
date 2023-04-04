/*
La suma de las cantidades e importe total de todas las entregas realizadas durante el 97.
*/

SELECT sum(E.cantidad) AS 'Cantidad Total', 
	   sum((E.cantidad * M.precio) * (1 + (M.porcentajeimpuesto / 100))) AS 'Total Vendido'
FROM entregan E, materiales M
WHERE M.clave = E.clave AND E.fecha BETWEEN '1997-01-01' AND '1997-12-31';

/*
Para cada proveedor, obtener la razón social del proveedor,
    número de entregas e importe total de las entregas realizadas.
*/
SELECT DISTINCT P.razonsocial AS 'Proveedor', 
	   count(*) AS 'Cantidad de entregas', 
	   sum((E.cantidad * M.precio) * (1 + (M.porcentajeimpuesto / 100))) AS 'Total Vendido'
FROM proveedores P, entregan E, materiales M
WHERE P.RFC = E.RFC AND E.clave = M.clave
GROUP BY P.razonsocial;

/*
Por cada material obtener la clave y descripción del material, 
    la cantidad total entregada, la mínima cantidad entregada, 
    la máxima cantidad entregada, el importe total de las entregas de aquellos 
    materiales en los que la cantidad promedio entregada sea mayor a 400.
*/
SELECT M.clave, M.descripcion, sum(cantidad) AS 'Total entregado', 
		min(cantidad) AS 'Minimo entregado', 
        max(cantidad) AS 'Maximo entregado',
        IF(avg(cantidad) > 400,  sum((E.cantidad * M.precio) * (1 + (M.porcentajeimpuesto / 100))), null) AS 'Total Vendido Con Cantidad Mayor a 400'
FROM materiales M, entregan E
WHERE M.clave = E.clave
GROUP BY M.descripcion;

/*
Para cada proveedor, indicar su razón social y mostrar la cantidad promedio de 
    cada material entregado, detallando la clave y descripción del material, 
    excluyendo aquellos proveedores para los que la cantidad promedio sea menor a 500.
*/

SELECT P.razonsocial, M.clave, M.descripcion
FROM proveedores P, entregan E, materiales M
WHERE P.RFC = E.RFC AND E.clave = M.clave
GROUP BY M.clave
HAVING avg(E.cantidad) > 499;

/*
Mostrar en una solo consulta los mismos datos que en la consulta anterior pero 
    para dos grupos de proveedores: aquellos para los que la cantidad promedio 
    entregada es menor a 370 y aquellos para los que la cantidad promedio entregada sea mayor a 450.
*/

SELECT P.razonsocial, M.clave, M.descripcion, avg(E.cantidad)
FROM proveedores P, entregan E, materiales M
WHERE P.RFC = E.RFC AND E.clave = M.clave
GROUP BY M.clave
HAVING avg(E.cantidad) > 450 OR avg(E.cantidad) < 370
ORDER BY avg(E.cantidad) desc;

/*
Materiales(Clave, Descripción, Costo, PorcentajeImpuesto)
Proveedores(RFC, RazonSocial)
Proyectos(Numero, Denominacion)
Entregan(Clave, RFC, Numero, Fecha, Cantidad)
*/

/*
Considerando que los valores de tipos CHAR y VARCHAR deben ir encerrados entre 
    apóstrofes, los valores numéricos se escriben directamente y los de fecha, 
    como '1-JAN-00' para 1o. de enero del 2000, inserta cinco nuevos materiales.
*/

INSERT INTO materieales (clave, descripcion, precio, porcentajeimpuesto) VALUES
()
