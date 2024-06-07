import { pool } from '../database/db.js';

// Esta función nos valida si un usuario 
export const getValUser = async (req, res) => {
    const {correo} = req.body
    const {contrasena} = req. body
    console.log(correo, contrasena)
    try {
        const [rows] = await pool.query('SELECT cedula FROM tblUsuario WHERE correo = ? AND contrasena = ?', [
          correo,
          contrasena,
        ]);

        if (rows.length <= 0)
            return res.status(404).json({
            message: 'El usuario no está registrado',
            });
      res.json(true);

    } catch (error) {
        return res.status(500).json({
        message: 'Error en el Sistema',
        });
    }
};

export const getCartProducts = async(req, res) => {
    const {cedula} = req.params
    try {
      const [rows] = await pool.query(
        'SELECT p.nombre, dc.cantidad, p.precio FROM tbldetallecarrito dc INNER JOIN tblproducto p ON p.idProducto = dc.idProducto INNER JOIN tblcarrito c ON c.idCarrito = dc.idCarrito INNER JOIN tblusuario us ON us.idCarrito = c.idCarrito WHERE us.cedula = ?',
        [cedula]
      );
      if(rows.length <= 0)
        return res.status(404).json({message: 'No se  not found'})
    res.json(rows)
    } catch (error) {
      return res.status(500).json({
        message: 'Something goes wrong',
      });
    }
}
