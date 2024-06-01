import { pool } from '../database/db.js';


// Consultar todas las mascotas registradas
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


// Consultar la información de una mascota
export const getMascota = async (req, res) => {
    try{
    console.log(req.params.id) //me devuelve el id que consultaron en la url
    const [rows] = await pool.query('SELECT m.* FROM tblmascota m INNER JOIN tblusuario u ON u.Cedula = m.Cedula WHERE m.Cedula = ?', [req.params.id])
    
    if (rows.length <= 0)
        return res.status(404).json({
            message: 'Pet not found'
    })
    res.json(rows);} catch (error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};


// Con esta función podemos agregar una mascota a un cliente
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

// Esta función nos permite actualizar la información de una mascota
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


// Esta función nos permite eliminar una mascota con su id y la cedula del cliente
export const deleteMascota = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tblmascota WHERE Cedula = ? AND IdMascota = ?', [
            (req.params.id),
            (req.params.idMascota)
        ]);
        console.log(result);

        if (result.affectedRows <= 0)
        return res.status(404).json({
            message: 'Mascota not found',
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong',
        });
    }
};