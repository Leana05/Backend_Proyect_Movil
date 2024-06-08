DROP DATABASE IF EXISTS dbTienda;
CREATE DATABASE dbTienda;
USE dbTienda;

CREATE TABLE tblCarrito
(
	idCarrito int AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE tblUsuario
(
	cedula int PRIMARY KEY,
	nombre varchar(30) NOT NULL,
	apellido varchar(30) NOT NULL,
	fechaNacimiento varchar(30) NOT NULL,
	direccion varchar(30) NOT NULL,
	celular int NOT NULL,
	correo varchar(30) NOT NULL,
	contrasena varchar(30) NOT NULL,
	foto LONGBLOB,
	idCarrito int,
	FOREIGN KEY (idCarrito) REFERENCES tblCarrito (idCarrito) ON DELETE CASCADE
);

CREATE TABLE tblMascota
(
	idMascota int AUTO_INCREMENT PRIMARY KEY,
	nombre varchar(20) NOT NULL,
	especie varchar(20) NOT NULL,
	raza varchar(20) NOT NULL,
	sexo varchar(10) NOT NULL,
	fechaNacimiento varchar(20) NOT NULL,
	cedula int NOT NULL,
	descripcion varchar(100),
	foto LONGBLOB,
	FOREIGN KEY (cedula) REFERENCES tblUsuario (cedula) ON DELETE CASCADE
);

CREATE TABLE tblCategoria
(
	idCategoria int AUTO_INCREMENT PRIMARY KEY,
	nombre varchar(30) NOT NULL
);

CREATE TABLE tblProducto
(
	idProducto int AUTO_INCREMENT PRIMARY KEY,
	nombre varchar(30) NOT NULL,
	descripcion varchar(50),
	precio numeric(18,0) NOT NULL,
	stock int NOT NULL,
	foto LONGBLOB,
	idCategoria int NOT NULL,
	FOREIGN KEY (idCategoria) REFERENCES tblCategoria (idCategoria)
);

CREATE TABLE tblDetalleCarrito
(
	idDetCarrito int AUTO_INCREMENT PRIMARY KEY,
	cantidad int NOT NULL,
	cedula int NOT NULL,
	idProducto int NOT NULL,
	FOREIGN KEY (cedula) REFERENCES tblUsuario (cedula) ON DELETE NO ACTION,
	FOREIGN KEY (idProducto) REFERENCES tblProducto (idProducto) ON DELETE CASCADE
);