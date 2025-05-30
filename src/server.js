import app from './app.js';
import { prisma } from './prismaClient.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const start = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Conectado a PostgreSQL');
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error de conexión:', error);
        process.exit(1);
    }
};

start();