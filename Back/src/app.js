import express from 'express';
import userRoutes from './routes/user.routes.js';
import mascotaRoutes from './routes/mascota.routes.js';
import orderRoutes from './routes/order.routes.js';
import detCarritoRoutes from './routes/detallecarrito.routes.js';
import productoRoutes from './routes/product.routes.js';
import detOrdenRoutes from './routes/detalleorden.routes.js';
import carritoRoutes from './routes/carrito.routes.js';
import validationRoutes from './routes/validaciones.routes.js'

const app = express();

app.use(express.json()); //Nos ayuda a tranformar las solicitudes a Json

app.use('/SignUp', userRoutes);
app.use('/Pets',mascotaRoutes);
app.use(orderRoutes);
app.use(detCarritoRoutes);
app.use('/Shop',productoRoutes);
app.use('/Cart',detOrdenRoutes);
app.use(carritoRoutes);
app.use('/validation',validationRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found',
    });
});

export default app;