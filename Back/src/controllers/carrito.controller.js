import { pool } from '../database/db.js';


// Consultar todos carritos de un usuario
export const getCarritos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT car.* FROM tblCarrito car INNER JOIN tblUsuario us ON us.cedula = car.cedula WHERE us.cedula = ?', [req.params.cedula]);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'No se encontró carrito de compras',
        });
    }
};



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
