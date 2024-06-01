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
	FOREIGN KEY (Cedula) REFERENCES tblUsuario (Cedula) ON DELETE CASCADE
);

CREATE TABLE tblCitas
(
	IdCitas int auto_increment PRIMARY KEY,
	Fecha varchar(20) not null,
	Hora varchar(20) not null,
	Cedula int not null,
	IdMascota int not null,
	FOREIGN KEY (Cedula) REFERENCES tblUsuario (Cedula) ON DELETE CASCADE,
	FOREIGN KEY (IdMascota) REFERENCES tblMascota (IdMascota) ON DELETE CASCADE
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
	FOREIGN KEY (Cedula) REFERENCES tblUsuario (Cedula) ON DELETE CASCADE,
	FOREIGN KEY (IdEstado) REFERENCES tblEstado (IdEstado) ON DELETE CASCADE
);

CREATE TABLE tblCarrito
(
	IdCarrito int auto_increment PRIMARY KEY,
	FechaCreacion varchar(20) not null,
	Cedula int not null, 
	FOREIGN KEY (Cedula) REFERENCES tblUsuario (Cedula) ON DELETE CASCADE
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
	FOREIGN KEY (IdOrden) REFERENCES tblOrden (IdOrden) ON DELETE CASCADE,
	FOREIGN KEY (IdProducto) REFERENCES tblProducto (IdProducto) ON DELETE CASCADE
);

CREATE TABLE tblDetalleCarrito
(
	IdDetCarrito int auto_increment PRIMARY KEY,
	Cantidad int not null,
	IdCarrito int not null,
	IdProducto int not null,
	FOREIGN KEY (IdCarrito) REFERENCES tblCarrito (IdCarrito) ON DELETE CASCADE,
	FOREIGN KEY (IdProducto) REFERENCES tblProducto (IdProducto) ON DELETE CASCADE
);


INSERT INTO tblUsuario (Cedula, Nombre, Apellido, FechaNacimiento, Direccion, Celular, Correo, contraseña)
VALUES
(11, 'Juan', 'Perez', '1985-04-15', 'Calle Falsa 123', 123, 'juan.perez@example.com', 'password123'),
(22, 'Maria', 'Gomez', '1990-05-20', 'Avenida Siempreviva 456', 987, 'maria.gomez@example.com', 'password456'),
(33, 'Carlos', 'Lopez', '1988-07-30', 'Boulevard de los Sueños 789', 555, 'carlos.lopez@example.com', 'password789');

-- Inserciones para tblMascota
INSERT INTO tblmascota (Nombre, Especie, Raza, Sexo, FechaNacimiento, Cedula, Descripcion, Foto)
VALUES
('Bobby', 'Perro', 'Labrador', 'Macho', '2018-08-01', 11, 'Perro muy amigable y juguetón', NULL),
('Mia', 'Gato', 'Siames', 'Hembra', '2019-09-15', 11, 'Gata tranquila y cariñosa', NULL),
('Max', 'Perro', 'Beagle', 'Macho', '2020-01-20', 11, 'Perro muy activo y curioso', NULL),
('Bella', 'Perro', 'Golden Retriever', 'Hembra', '2017-11-10', 22, 'Perra leal y protectora', NULL),
('Luna', 'Gato', 'Persa', 'Hembra', '2016-05-05', 33, 'Gata independiente y elegante', NULL);

