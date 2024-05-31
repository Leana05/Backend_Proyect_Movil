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

export const updateInfoUser = async (req, res) => {
  const { Cedula } = req.params;
  const { Nombre, Apellido, FechaNacimiento, Direccion, Celular, Correo, contraseña } = req.body;
  try {
    // throw new Error(':C')
    const [result] = await pool.query(
      'UPDATE tblusuario SET Nombre = IFNULL(?, Nombre), Apellido = IFNULL(?, Apellido), FechaNacimiento = IFNULL(?, FechaNacimiento), Direccion = IFNULL(?, Direccion), Celular = IFNULL(?, Celular), Correo = IFNULL(?, Correo), contraseña = IFNULL(?, contraseña), Foto = IFNULL(?, Foto) WHERE Cedula = ?',
      [Nombre, Apellido, FechaNacimiento, Direccion, Celular, Correo, contraseña, Foto]
    );
    console.log(result);

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: 'User not found',
      });

    const [rows] = await pool.query('SELECT * FROM tblusuario WHERE Cedula = ?', [Cedula]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};