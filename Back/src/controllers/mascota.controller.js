import { pool } from '../database/db.js';

export const getMascotas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tblMascota');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
        message: 'No se encontraron mascotas',
        });
    }
};

export const createNewMascota = async (req, res) => {
    const { Nombre, Especie, Raza, Sexo, FechaNacimiento, Cedula, Descripcion, Foto } = req.body;
    try {
        const [rows] = await pool.query(
        'INSERT INTO tblMascota (Nombre, Especie, Raza, Sexo, FechaNacimiento, Cedula, Descripcion, Foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [Nombre, Especie, Raza, Sexo, FechaNacimiento, Cedula, Descripcion, Foto]
        );

        res.send({
        id: rows.insertId,
        Nombre,
        Especie,
        Raza,
        Sexo,
        FechaNacimiento,
        Cedula,
        Descripcion,
        Foto,
        });
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong',
        });
    }
};

export const updateMascota = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Especie, Raza, Sexo, FechaNacimiento, Cedula, Descripcion, Foto } = req.body;
    try {
        const [result] = await pool.query(
        'UPDATE tblMascota SET Nombre = IFNULL(?, Nombre), Especie = IFNULL(?, Especie), Raza = IFNULL(?, Raza), Sexo = IFNULL(?, Sexo), FechaNacimiento = IFNULL(?, FechaNacimiento), Cedula = IFNULL(?, Cedula), Descripcion = IFNULL(?, Descripcion), Foto = IFNULL(?, Foto) WHERE IdMascota = ?',
        [Nombre, Especie, Raza, Sexo, FechaNacimiento, Cedula, Descripcion, Foto, id]
        );

        if (result.affectedRows === 0)
        return res.status(404).json({
            message: 'Mascota not found',
        });

        const [rows] = await pool.query('SELECT * FROM tblMascota WHERE IdMascota = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong',
        });
    }
};
