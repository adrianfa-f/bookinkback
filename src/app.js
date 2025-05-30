import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger-config.js';
import authRoutes from './routes/auth.route.js';
import productoRoutes from './routes/productos.route.js';
import testimonioRoutes from './routes/testimonios.route.js';
import blogRoutes from './routes/blog.route.js';

const app = express();

// Middlewares
app.use(cors(
    {
    origin: 'http://localhost:3000', // URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
/* app.use(express.urlencoded({ extended: true })) */

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/testimonios', testimonioRoutes);
app.use('/api/blog', blogRoutes);
app.get('/api/test-db', async (req, res) => {
    try {
        const result = await prisma.$queryRaw`SELECT 1+1 AS result`;
        res.json({ dbStatus: 'OK', result });
    } catch (error) {
        res.status(500).json({ dbStatus: 'ERROR', error: error.message });
    }
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

export default app;