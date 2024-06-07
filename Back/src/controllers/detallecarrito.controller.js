import { pool } from "../database/db.js";

// Consultar la información de un detalle de carrito
export const getDetCarrito = async (req, res) => {
    try{
    console.log(req.params.idDetCarrito); //me devuelve el id que consultaron en la url
    const [rows] = await pool.query('SELECT * FROM tbldetallecarrito WHERE idDetCarrito = ?', [req.params.idDetCarrito]);
    
    if (rows.length <= 0)
        return res.status(404).json({
            message: 'Detail not found'
    })
    res.json(rows);} catch (error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};

export const deleteDetCarrito = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tbldetallecarrito WHERE idDetCarrito = ?', [
            req.params.idDetCarrito,
        ]);

        if (result.affectedRows <= 0)
        return res.status(404).json({
            message: 'Detail not found',
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong',
        });
    }
};

export const updateDetCarrito = async (req, res) => {
    const { idDetCarrito } = req.params;
    const { cantidad } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE tbldetallecarrito SET cantidad = IFNULL(?, cantidad) WHERE idDetCarrito = ?',
            [cantidad, idDetCarrito]
        );
        console.log(result);

        if (result.affectedRows === 0)
        return res.status(404).json({
            message: 'Detail not found',
        });

        const [rows] = await pool.query('SELECT * FROM tbldetallecarrito WHERE idDetCarrito = ?', [idDetCarrito]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong',
        });
    }
};