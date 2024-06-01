import { pool } from '../database/db.js';

// Esta función nos devuelve todos los usuarios registrados
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

// Con esta función consultados un usuario por su Cedula
export const getUser = async (req, res) => {
  try {
    console.log(req.params.id); //me devuelve el id que consultaron en la URL
    const [rows] = await pool.query('SELECT * FROM tblusuario WHERE Cedula = ?', [req.params.id]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: 'User not found',
      });
    res.json(rows[0]);
    
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};

// Esta función nos permite crear un usuario
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

// Esta función nos permite actializar parcialmente la información de un usuario
//  El pacth nos permite actualizar la información que deseamos, sin tener que vernos obligados a actualizar todos los campos
export const updateInfoUser = async (req, res) => {
  console.log(req.params);
  const Cedula = req.params.id;
  console.log(Cedula)
  const { Nombre, Apellido, FechaNacimiento, Direccion, Celular, Correo, contraseña, Foto } = req.body;
  try {
    // throw new Error(':C')
    const [result] = await pool.query(
      'UPDATE tblusuario SET Nombre = IFNULL(?, Nombre), Apellido = IFNULL(?, Apellido), FechaNacimiento = IFNULL(?, FechaNacimiento), Direccion = IFNULL(?, Direccion), Celular = IFNULL(?, Celular), Correo = IFNULL(?, Correo), contraseña = IFNULL(?, contraseña), Foto = IFNULL(?, Foto) WHERE Cedula = ?',
      [Nombre, Apellido, FechaNacimiento, Direccion, Celular, Correo, contraseña, Foto, Cedula]
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

// Función para eliminar toda la información relacionada con el usuario
export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tblusuario WHERE Cedula = ?', [req.params.id]);
    console.log(result);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: 'User not found',
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};
