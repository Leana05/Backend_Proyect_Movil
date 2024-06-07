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
    const [rows] = await pool.query('SELECT * FROM tblusuario WHERE cedula = ?', [req.params.cedula]);

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
  const { cedula, nombre, apellido, fechaNacimiento, direccion, celular, correo, contrasena, foto} = req.body;
  try {
    const [rows] = await pool.query(
      'Call spInsertUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [cedula, nombre, apellido, fechaNacimiento, direccion, celular, correo, contrasena, foto]
    );

    res.send({
      nombre,
      apellido,
      fechaNacimiento,
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};


//  El pacth nos permite actualizar la información que deseamos, sin tener que vernos obligados a actualizar todos los campos
export const updateInfoUser = async (req, res) => {
  const cedula = req.params.cedula;
  const { nombre, apellido, fechaNacimiento, direccion, celular, correo, contrasena, foto } = req.body;
  try {
    // throw new Error(':C')
    const [result] = await pool.query(
      'UPDATE tblusuario SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), fechaNacimiento = IFNULL(?, fechaNacimiento), direccion = IFNULL(?, direccion), celular = IFNULL(?, celular), correo = IFNULL(?, correo), contrasena = IFNULL(?, contrasena), foto = IFNULL(?, foto) WHERE cedula = ?',
      [nombre, apellido, fechaNacimiento, direccion, celular, correo, contrasena, foto, cedula]
    );
    console.log(result);

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: 'User not found',
      });

    const [rows] = await pool.query('SELECT * FROM tblusuario WHERE cedula = ?', [cedula]);
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
    const [result] = await pool.query('DELETE FROM tblusuario WHERE cedula = ?', [req.params.cedula]);
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
