import { pool } from '../database/db.js';

export const getUsers = async (req, res) => {
  try {
    // throw new Error('DB Error')
    const [rows] = await pool.query('SELECT * FROM tblusuario');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: 'No se encontraron usuarios',
    });
  }
};

export const createNewUser = async (req, res) => {
  const { Cedula, Nombre, Apellido, FechaNacimiento, Direccion, Celular, Correo, contraseña } = req.body; //Extraemos la informacion de la solicitud que hizo el cliente
  
  try {
    const [rows] = await pool.query(
      'INSERT INTO tblusuario(Cedula, Nombre, Apellido, FechaNacimiento, Direccion, Celular, Correo, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [Cedula, Nombre, Apellido, FechaNacimiento, Direccion, Celular, Correo, contraseña]);

    res.send({
      id: rows.insertId,
      Cedula,
      Nombre,
      contraseña,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};