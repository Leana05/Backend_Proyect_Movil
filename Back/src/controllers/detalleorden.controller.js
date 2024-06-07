import { pool } from '../database/db.js';


// Consultar todas los detalles de orden de un usuario
export const getDetalleOrden = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT do.* FROM tbldetalleOrden do INNER JOIN tblOrden o ON o.idOrden = do.idOrden INNER JOIN tblUsuario us ON us.cedula = o.cedula WHERE us.cedula = ?', [req.params.cedula]);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'No se encontrararon detalles de orden',
        });
    }
};