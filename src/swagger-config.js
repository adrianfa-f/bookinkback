import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de BookInk',
            version: '1.0.0',
            description: 'Documentación de la API de BookInk',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],
    },
    apis: ['./routes/*.js'], // Asegúrate de que tus archivos de rutas tienen documentación Swagger
};

export const specs = swaggerJsdoc(options);
