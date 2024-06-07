DELIMITER //
CREATE PROCEDURE spInsertUsuario(
    IN p_cedula int,
    IN p_nombre varchar(30),
    IN p_apellido varchar(30),
    IN p_fechaNacimiento varchar(30),
    IN p_direccion varchar(30),
    IN p_celular int,
    IN p_correo varchar(30),
    IN p_contrasena varchar(30)
)
BEGIN
    -- Insert a new carrito for the user
    INSERT INTO tblCarrito() VALUES();
    
    -- Get the id of the new carrito
    SET @idCarrito = LAST_INSERT_ID();
    
    -- Insert the new user with the assigned idCarrito
    INSERT INTO tblUsuario (cedula, nombre, apellido, fechaNacimiento, direccion, celular, correo, contrasena, idCarrito)
    VALUES (p_cedula, p_nombre, p_apellido, p_fechaNacimiento, p_direccion, p_celular, p_correo, p_contrasena, @idCarrito);
END;
//
DELIMITER ;