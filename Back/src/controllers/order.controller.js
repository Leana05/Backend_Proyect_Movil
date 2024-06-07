import { pool } from '../database/db.js'

// Consultar la información de una orden
export const getOrder = async (req, res) => {
    try{
    console.log(req.params.idOrden); //me devuelve el id que consultaron en la url
    const [rows] = await pool.query('SELECT * FROM tblorden WHERE idOrden = ?', [req.params.idOrden]);
    
    if (rows.length <= 0)
        return res.status(404).json({
            message: 'Order not found'
    })
    res.json(rows);} catch (error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};


// Esta función nos permite crear una orden
export const createOrder = async (req, res) => {
    const { fechaOrden, total, cedula } = req.body; //Extraemos la informacion de la solicitud que hizo el cliente

    try {
        const [rows] = await pool.query('INSERT INTO tblOrden (fechaOrden, total, cedula) VALUES (?, ?, ?)',
        [fechaOrden, total, cedula]
        );

        res.send({
        id: rows.insertId,
        fechaOrden,
        total,
        cedula,
        });
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong',
        });
    }
};
