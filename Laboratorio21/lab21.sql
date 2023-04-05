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
Considerando que los valores de tipos CHAR y VARCHAR deben ir encerrados entre 
    apóstrofes, los valores numéricos se escriben directamente y los de fecha, 
    como '1-JAN-00' para 1o. de enero del 2000, inserta cinco nuevos materiales.
*/

INSERT INTO materieales (clave, descripcion, precio, porcentajeimpuesto) VALUES
(2001, 'Tubo de cobre 3/16', 320, 8),
(2002, 'Impermeabilizante rojo', 520, 10),
(2003, 'Pintura B2010', 125, 16),
(2004, 'Madera 3/2', 240, 7),
(2005, 'Codo de cobre 3/16', 320, 8);

/*
Clave y descripción de los materiales que nunca han sido entregados.
*/
SELECT M.clave, M.descripcion 
FROM materiales M
WHERE M.clave NOT IN (SELECT DISTINCT clave FROM entregan);

-- Con joins
SELECT M.clave, M.descripcion 
FROM materiales M
LEFT JOIN entregan E
ON M.clave = E.clave
WHERE E.clave IS NULL;

/*
Razón social de los proveedores que han realizado entregas tanto al 
    proyecto 'Vamos México' como al proyecto 'Querétaro Limpio'.
*/

SELECT razonsocial 
FROM proveedores
WHERE rfc IN (
	SELECT rfc 
	FROM entregan 
	WHERE numero IN (
		SELECT numero 
		FROM proyectos 
		WHERE denominacion = 'Vamos Mexico' 
		   OR denominacion = 'Queretaro limpio'));

-- Sin sub-consultas 
SELECT DISTINCT PR.razonsocial
FROM proveedores PR, entregan E, proyectos P
WHERE PR.rfc = E.rfc AND E.numero = P.numero 
  AND (P.denominacion = 'Vamos Mexico' OR P.denominacion = 'Queretaro limpio');

/*
Descripción de los materiales que nunca han sido entregados al proyecto 'CIT 
    Yucatán'.
*/

SELECT descripcion
FROM materiales
WHERE clave NOT IN (
	SELECT clave
	FROM entregan
	WHERE numero IN(
		SELECT numero
		FROM proyectos
		WHERE denominacion = 'CIT Yucatan'));

/*
Razón social y promedio de cantidad entregada de los proveedores cuyo promedio 
    de cantidad entregada es mayor al promedio de la cantidad entregada por el 
    proveedor con el RFC 'VAGO780901'.
*/

SELECT razonsocial
FROM (
	SELECT P.razonsocial , P.rfc, avg(E.cantidad) 
	FROM entregan E, proveedores P
	WHERE P.rfc = E.rfc
	GROUP BY rfc
	HAVING avg(E.cantidad) > (
		SELECT avg(cantidad)
		FROM entregan
		WHERE rfc = 'HHHH800101'
)) AS T;

/*
Materiales(Clave, Descripción, Costo, PorcentajeImpuesto)
Proveedores(RFC, RazonSocial)
Proyectos(Numero, Denominacion)
Entregan(Clave, RFC, Numero, Fecha, Cantidad)
*/
/*
RFC, razón social de los proveedores que participaron en el proyecto 'Infonavit 
    Durango' y cuyas cantidades totales entregadas en el 2000 fueron mayores a 
    las cantidades totales entregadas en el 2001.
*/
SELECT A.razonsocial
FROM 
	(SELECT P.rfc, P.razonsocial, sum(E.cantidad) AS 'total'
	FROM proveedores P, entregan E
	WHERE P.rfc = E.rfc AND E.fecha BETWEEN '2000-01-01' AND '2000-12-31'
	GROUP BY P.rfc) A,
	(SELECT P.rfc, P.razonsocial, sum(E.cantidad) AS 'total'
	FROM proveedores P, entregan E
	WHERE P.rfc = E.rfc AND E.fecha BETWEEN '2001-01-01' AND '2001-12-31'
	GROUP BY P.rfc) B
WHERE A.total > B.total AND A.rfc = B.rfc AND A.rfc IN (
	SELECT rfc FROM entregan WHERE numero IN (
		SELECT numero FROM proyectos WHERE denominacion = 'Infonavit Durango'));