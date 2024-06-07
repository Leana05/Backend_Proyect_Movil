DELIMITER //
CREATE PROCEDURE spInsertUsuario(
    IN cedula int,
    IN nombre varchar(30),
    IN apellido varchar(30),
    IN fechaNacimiento varchar(30),
    IN direccion varchar(30),
    IN celular int,
    IN correo varchar(30),
    IN contrasena varchar(30),
    IN foto longblob
)
BEGIN
    -- Insert a new carrito for the user
    INSERT INTO tblCarrito() VALUES();
    
    -- Get the id of the new carrito
    SET @idCarrito = LAST_INSERT_ID();
    
    -- Insert the new user with the assigned idCarrito
    INSERT INTO tblUsuario (cedula, nombre, apellido, fechaNacimiento, direccion, celular, correo, contrasena,fot, idCarrito)
    VALUES (cedula, nombre, apellido, fechaNacimiento, direccion, celular, correo, contrasena,foto, @idCarrito);
END;
//
DELIMITER ;