import { pool } from '../database/db.js';

// Esta función nos permite eliminar un carrito
export const deleteCarrito = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tblCarrito WHERE cedula = ?', [
            (req.params.cedula)
        ]);
        console.log(result);

        if (result.affectedRows <= 0)
            return res.status(404).json({
                message: 'Carrito not found',
            });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
        });
    }
};


export const postDetCarrito = async (req, res) => {
    const { cantidad, cedula, idProducto } = req.body;
    try {
        const cantidad = 1;
        const [rows] = await pool.query(
            'INSERT INTO tblDetalleCarrito (cantidad, cedula, idProducto) VALUES (?, ?, ?)',
            [cantidad, cedula, idProducto]
        );

        res.send({
            id: rows.insertId,
            cantidad,
            cedula,
            idProducto
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
        });
    }
};


