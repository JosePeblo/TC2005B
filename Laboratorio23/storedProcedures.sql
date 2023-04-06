-- Cuenta de las entregas a un proyecto dada su denominacón 
delimiter //

CREATE PROCEDURE cuenta_entregas_a_proyectos (IN denomin VARCHAR(255))
BEGIN 
	SELECT count(*) AS 'cantidad' FROM entregan E, proyectos P
	WHERE E.numero = P.numero AND P.denominacion = denomin;
END //

delimiter ;

CALL cuenta_entregas_a_proyectos('Aztecon');


-- Regresa el nombre de los proveedores que le han entregado a un proyecto
delimiter //

CREATE PROCEDURE proveedores_de_proyectos (IN denomin VARCHAR(255))

BEGIN 
    SELECT P.razonsocial AS 'Proveedor' FROM proveedores P, entregan E, proyectos PR
    WHERE P.rfc = E.rfc AND E.numero = PR.numero AND PR.denominacion = denomin;
END //

delimiter ;

CALL proveedores_de_proyectos('CIT Yucatan');

-- Registrar una entrega en el momento según la descripcion del material, la razon social de proveedor, la denominacion del proyecto y la cantida entregado
delimiter //

CREATE PROCEDURE registrar_entrega (IN descript VARCHAR(255), IN razonsoc VARCHAR(255), IN denomin VARCHAR(255), IN ammount INT)
BEGIN
    INSERT INTO entregan (clave, rfc, numero, fecha, cantidad) VALUES
    SELECT M.clave, P.rfc, PR.numero, NOW(), ammount
    FROM materiales M, proveedores P, proyectos PR
    WHERE M.descripcion = descript AND P.razonsocial = razonsoc AND PR.denominacion = denomin;
END //

delimiter ;

CALL registrar_entrega('Arena', 'Oviedo', 'Aztecon', 2555);

/*
Materiales(Clave, Descripción, Costo, PorcentajeImpuesto)
Proveedores(RFC, RazonSocial)
Proyectos(Numero, Denominacion)
Entregan(Clave, RFC, Numero, Fecha, Cantidad)
*/
