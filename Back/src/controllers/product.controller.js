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


// Consultar la información de un producto
export const getProducto = async (req, res) => {
    try {
        console.log(req.params.id) //me devuelve el id que consultaron en la url
        const [rows] = await pool.query('SELECT * FROM tblproducto WHERE idProducto = ?', [req.params.id])

        if (rows.length <= 0)
            return res.status(404).json({
                message: 'Product not found'
            })
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};


// Con esta función podemos agregar un producto
export const createNewProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock, foto, idCategoria } = req.body;
    try {
        const [rows] = await pool.query(
            'INSERT INTO tblproducto (nombre, descripcion, precio, stock, foto, idCategoria) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, foto, idCategoria]
        );

        res.send({
            idProducto: rows.insertId,
            nombre, 
            descripcion, 
            precio, 
            stock, 
            foto, 
            idCategoria
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
        });
    }
};

// Esta función nos permite actualizar la información de un producto
export const updateProducto = async (req, res) => {
    const {idProducto} = req.params;
    console.log(idProducto)
    const { nombre, descripcion, precio, stock, foto, idCategoria } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE tblproducto SET Nombre = IFNULL(?, Nombre), descripcion = IFNULL(?, descripcion), precio = IFNULL(?, precio), stock = IFNULL(?, stock), foto = IFNULL(?, foto), idCategoria = IFNULL(?, idCategoria) WHERE idProducto = ?',
            [Nombre, descripcion, precio, stock, foto, idCategoria, idProducto]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({
                message: 'Product not found',
            });

        const [rows] = await pool.query('SELECT * FROM tblproducto WHERE idProducto = ?', [idProducto]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
        });
    }
};


// Esta función nos permite eliminar un producto
export const deleteMascota = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tblproducto WHERE idProducto = ?', [
            (req.params.idProducto),
        ]);
        console.log(result);

        if (result.affectedRows <= 0)
            return res.status(404).json({
                message: 'Product not found',
            });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
        });
    }
};