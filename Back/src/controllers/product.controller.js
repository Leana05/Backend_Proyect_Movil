import { pool } from '../database/db.js';


// Consultar todas los productos registrados
export const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tblproducto');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'No se encontraron productos',
        });
    }
};