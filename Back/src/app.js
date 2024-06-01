import express from 'express';
import registerUser from './routes/registerUser.routes.js';
import mascotaRoutes from './routes/mascota.routes.js';
import productoRoutes from './routes/product.routes.js';

const app = express();

app.use(express.json()); //Nos ayuda a tranformar las solicitudes a Json

app.use(registerUser);
app.use(mascotaRoutes);
app.use(productoRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found',
    });
});

export default app;
