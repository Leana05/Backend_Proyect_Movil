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
    const [rows] = await pool.query('SELECT m.* FROM tblmascota m INNER JOIN tblusuario u ON u.cedula = m.cedula WHERE m.cedula = ?', [req.params.id])
    
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
    const { nombre, especie, raza, sexo, fechaNacimiento, cedula, descripcion, foto } = req.body;
    try {
        const [rows] = await pool.query(
        'INSERT INTO tblMascota (nombre, especie, raza, sexo, fechaNacimiento, cedula, descripcion, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, especie, raza, sexo, fechaNacimiento, cedula, descripcion, foto]
        );

        res.send({
        id: rows.insertId,
        nombre,
        especie,
        raza,
        sexo,
        fechaNacimiento,
        cedula,
        descripcion,
        foto,
        });

    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong',
        });
    }
};


// Esta función nos permite eliminar una mascota con su id y la cedula del cliente
export const deleteMascota = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tblmascota WHERE cedula = ? AND IdMascota = ?', [
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