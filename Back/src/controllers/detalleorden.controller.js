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


// Consultar la información de detalle de orden especifico
export const getDetOrden = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tbldetalleOrden WHERE idDetOrden = ?', [req.params.idDetOrden])

        if (rows.length <= 0)
            return res.status(404).json({
                message: 'Detalle orden not found'
            })
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};