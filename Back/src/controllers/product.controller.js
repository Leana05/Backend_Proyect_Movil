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
        const [rows] = await pool.query('SELECT * FROM tblproducto WHERE IdProducto = ?', [req.params.id])

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
    const { Nombre, Descripción, Precio, Stock, Foto, IdCategoria } = req.body;
    try {
        const [rows] = await pool.query(
            'INSERT INTO tblproducto (Nombre, Descripción, Precio, Stock, Foto, IdCategoria) VALUES (?, ?, ?, ?, ?, ?)',
            [Nombre, Descripción, Precio, Stock, Foto, IdCategoria]
        );

        res.send({
            IdProducto: rows.insertId,
            Nombre, 
            Descripción, 
            Precio, 
            Stock, 
            Foto, 
            IdCategoria
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
        });
    }
};

// Esta función nos permite actualizar la información de un producto
export const updateProducto = async (req, res) => {
    const {IdProducto} = req.params;
    console.log(IdProducto)
    const { Nombre, Descripción, Precio, Stock, Foto, IdCategoria } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE tblproducto SET Nombre = IFNULL(?, Nombre), Descripción = IFNULL(?, Descripción), Precio = IFNULL(?, Precio), Stock = IFNULL(?, Stock), Foto = IFNULL(?, Foto), IdCategoria = IFNULL(?, IdCategoria) WHERE IdProducto = ?',
            [Nombre, Descripción, Precio, Stock, Foto, IdCategoria, IdProducto]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({
                message: 'Product not found',
            });

        const [rows] = await pool.query('SELECT * FROM tblproducto WHERE IdProducto = ?', [IdProducto]);
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
        const [result] = await pool.query('DELETE FROM tblproducto WHERE IdProducto = ?', [
            (req.params.IdProducto),
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