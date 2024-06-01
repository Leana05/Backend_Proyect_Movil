import { pool } from '../database/db.js';


// Consultar todos carritos de un usuario
export const getCarritos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT car.* FROM tblCarrito car INNER JOIN tblUsuario us ON us.Cedula = car.Cedula WHERE us.Cedula = ?', [req.params.Cedula]);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'No se encontró carrito de compras',
        });
    }
};

// Con esta función podemos agregar un nuevo carrito
export const createNewProducto = async (req, res) => {
    const { FechaCreacion, Cedula } = req.body;
    try {
        const [rows] = await pool.query(
            'INSERT INTO tblcarrito (FechaCreacion, Cedula) VALUES (?, ?)',
            [FechaCreacion, Cedula]
        );

        res.send({
            IdProducto: rows.insertId,
            FechaCreacion, 
            Cedula,
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
        });
    }
};

// Esta función nos permite eliminar un carrito
export const deleteCarrito = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tblCarrito WHERE Cedula = ?', [
            (req.params.Cedula)
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
