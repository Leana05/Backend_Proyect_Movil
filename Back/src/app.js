import express from 'express';
import registerUser from './routes/registerUser.routes.js';
import mascotaRoutes from './routes/mascota.routes.js';
import appointmentRoutes from "./routes/appointment.routes.js";
import orderRoutes from './routes/order.routes.js';
import detCarritoRoutes from './routes/detallecarrito.routes.js';
import productoRoutes from './routes/product.routes.js';
import detOrdenRoutes from './routes/detalleorden.routes.js';
import carritoRoutes from './routes/carrito.routes.js';

const app = express();

app.use(express.json()); //Nos ayuda a tranformar las solicitudes a Json

app.use(registerUser);
app.use(mascotaRoutes);
app.use(appointmentRoutes);
app.use(orderRoutes);
app.use(detCarritoRoutes);
app.use(productoRoutes);
app.use(detOrdenRoutes);
app.use(carritoRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found',
    });
});

export default app;
