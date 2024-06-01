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
    const { FechaOrden, Total, Cedula, IdEstado } = req.body; //Extraemos la informacion de la solicitud que hizo el cliente
    console.log(FechaOrden, Total, Cedula, IdEstado)

    try {
        const [rows] = await pool.query('INSERT INTO tblOrden (FechaOrden, Total, Cedula, IdEstado) VALUES (?, ?, ?, ?)',
        [FechaOrden, Total, Cedula, IdEstado]
        );

        res.send({
        id: rows.insertId,
        FechaOrden,
        Total,
        Cedula,
        IdEstado
        });
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong',
        });
    }
};

// Función para eliminar toda la información relacionada con una cita
export const deleteOrder = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tblorden WHERE IdOrden = ?', [req.params.idOrden]);
        console.log(result);

        if (result.affectedRows <= 0)
        return res.status(404).json({
            message: 'Order not found',
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong',
        });
    }
};

// Esta función nos permite actializar parcialmente la información de un usuario
//  El pacth nos permite actualizar la información que deseamos, sin tener que vernos obligados a actualizar todos los campos
export const updateStateOrder = async (req, res) => {
    const { idOrden } = req.params;
    const { IdEstado } = req.body;
    console.log(req.body.IdEstado, req.params.IdOrden);
    try {
        // throw new Error(':C')
        const [result] = await pool.query('UPDATE tblorden SET IdEstado = ?  WHERE IdOrden = ?', [IdEstado, idOrden]);
        console.log(result);

        if (result.affectedRows === 0)
        return res.status(404).json({
            message: 'Order not found',
        });

        const [rows] = await pool.query('SELECT * FROM tblorden WHERE IdOrden = ?', [idOrden]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong',
        });
    }
};
