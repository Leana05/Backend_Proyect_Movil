/*CREATE DATABASE dbTienda*/

use dbTienda;

CREATE TABLE tblUsuario
(
	Cedula int PRIMARY KEY,
	Nombre varchar(30) not null,
	Apellido varchar(30) not null,
	FechaNacimiento varchar(30) not null,
	Direccion varchar(30) not null,
	Celular int not null,
	Correo varchar(30) not null,
	contraseña varchar(30) not null,
	Foto LONGBLOB
);

CREATE TABLE tblMascota
(
	IdMascota int auto_increment PRIMARY KEY,
	Nombre varchar(20) not null,
	Especie varchar(20) not null,
	Raza varchar(20) not null,
	Sexo varchar(10) not null,
	FechaNacimiento varchar(20) not null,
	Cedula int not null,
	Descripcion varchar(100),
	Foto longblob,
	FOREIGN KEY (Cedula) REFERENCES tblUsuario (Cedula)
);

CREATE TABLE tblCitas
(
	IdCitas int auto_increment PRIMARY KEY,
	Fecha varchar(20) not null,
	Hora varchar(20) not null,
	Cedula int not null,
	IdMascota int not null,
	FOREIGN KEY (Cedula) REFERENCES tblUsuario (Cedula),
	FOREIGN KEY (IdMascota) REFERENCES tblMascota (IdMascota)
);


CREATE TABLE tblEstado
(
	IdEstado int auto_increment PRIMARY KEY,
	Nombre varchar(20) not null
);

CREATE TABLE tblOrden
(
	IdOrden int auto_increment PRIMARY KEY,
	FechaOrden varchar(20) not null,
	Total numeric(18,0) not null,
	Cedula int not null,
	IdEstado int not null, 
	FOREIGN KEY (Cedula) REFERENCES tblUsuario (Cedula),
	FOREIGN KEY (IdEstado) REFERENCES tblEstado (IdEstado)
);

CREATE TABLE tblCarrito
(
	IdCarrito int auto_increment PRIMARY KEY,
	FechaCreacion varchar(20) not null,
	Cedula int not null, 
	FOREIGN KEY (Cedula) REFERENCES tblUsuario (Cedula)
);

CREATE TABLE tblCategorias
(
	IdCategoria int auto_increment PRIMARY KEY,
	Nombre varchar(30) not null
);

CREATE TABLE tblProducto
(
	IdProducto int auto_increment PRIMARY KEY,
	Nombre varchar(30) not null,
	Descripción varchar(50),
	Precio numeric(18,0) not null,
	Stock int not null,
	Foto longblob,
	IdCategoria int not null,
	FOREIGN KEY (IdCategoria) REFERENCES tblCategorias (IdCategoria)
);

CREATE TABLE tblDetalleOrden
(
	IdDetOrden int auto_increment PRIMARY KEY,
	Cantidad int not null,
	Precio numeric(18,0) not null,
	IdOrden int not null,
	IdProducto int not null,
	FOREIGN KEY (IdOrden) REFERENCES tblOrden (IdOrden),
	FOREIGN KEY (IdProducto) REFERENCES tblProducto (IdProducto)
);

CREATE TABLE tblDetalleCarrito
(
	IdDetCarrito int auto_increment PRIMARY KEY,
	Cantidad int not null,
	IdCarrito int not null,
	IdProducto int not null,
	FOREIGN KEY (IdCarrito) REFERENCES tblCarrito (IdCarrito),
	FOREIGN KEY (IdProducto) REFERENCES tblProducto (IdProducto)
);