import { pool } from '../database/db.js'

// Consultar la información de una cita
export const getAppointment = async (req, res) => {
    try{
    console.log(req.params.idCita); //me devuelve el id que consultaron en la url
    const [rows] = await pool.query('SELECT * FROM tblcitas WHERE Cedula = ?', [req.params.idCita]);
    
    if (rows.length <= 0)
        return res.status(404).json({
            message: 'Appointment not found'
    })
    res.json(rows);} catch (error){
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};


// Esta función nos permite crear una cita
export const createAppointment = async (req, res) => {
  const { IdCitas, Fecha, Hora, Cedula, IdMascota} = req.body; //Extraemos la informacion de la solicitud que hizo el cliente

    try {
        const [rows] = await pool.query(
            'INSERT INTO tblcitas(IdCitas, Fecha, Hora, Cedula, IdMascota) VALUES (?, ?, ?, ?, ?)',
            [IdCitas, Fecha, Hora, Cedula, IdMascota]
        );

        res.send({
        id: rows.insertId,
        IdCitas,
        Fecha,
        Hora,
        Cedula,
        IdMascota
        });
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong',
        });
    }
};

// Función para eliminar toda la información relacionada con una cita
export const deleteAppointment = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tblcitas WHERE Cedula = ?', [req.params.idCita]);
        console.log(result);

        if (result.affectedRows <= 0)
        return res.status(404).json({
            message: 'Appointment not found',
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong',
        });
    }
};
