import { prisma } from '../prismaClient.js';
import { crearProductoValidator, actualizarProductoValidator } from '../validator/producto.validator.js';
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const handleCloudinaryError = (error) => {
    console.error('Error en Cloudinary:', error);
    // Puedes lanzar el error o manejarlo según necesites
};

export const getProductos = async (req, res) => {
    try {
        const productos = await prisma.producto.findMany();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

export const getProductosByCategory = async (req, res) => {
    try {
        const productos = await prisma.producto.findMany({
            where: { categoria: req.params.categoria }
        });
    
        if (productos.length === 0) {
            return res.status(404).json({ error: 'No hay productos en esta categoría' });
        }
    
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

export const createProducto = async (req, res) => {
    console.log('[1] Inicio de createProducto');
    try {
        console.log('[2] Body recibido:', req.body);
        
        // Validación
        const inputData = crearProductoValidator.parse(req.body);
        console.log('[3] Datos validados:', inputData);
        
        // Creación en DB
        console.log('[4] Intentando crear en Prisma...');
        const producto = await prisma.producto.create({
            data: inputData,
        });
        console.log('[5] Producto creado:', producto);
        
        // Respuesta
        res.status(201).json(producto);
        console.log('[6] Respuesta enviada');
    } catch (error) {
        console.error('[ERROR] Detalles:', error);
        res.status(500).json({ 
            error: 'Error interno',
            detalles: error.message 
        });
    }
};

export const updateProducto = async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const existingProduct = await prisma.producto.findUnique({ where: { id: productId }});

        if (!existingProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Eliminar imagen anterior si se está actualizando
        if (existingProduct.cloudinary_id !== req.body.cloudinary_id) {
            try {
                await cloudinary.uploader.destroy(existingProduct.cloudinary_id);
            } catch (cloudinaryError) {
                handleCloudinaryError(cloudinaryError);
            }
        }

        const data = actualizarProductoValidator.parse(req.body);
        const updatedProduct = await prisma.producto.update({
            where: { id: productId },
            data
        });

        res.json(updatedProduct);
    } catch (error) {
        handleControllerError(res, error, 'update');
    }
};

export const deleteProducto = async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const existingProduct = await prisma.producto.findUnique({ where: { id: productId }});

        if (!existingProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Eliminar imagen de Cloudinary si existe
        if (existingProduct.cloudinary_id) {
            try {
                await cloudinary.uploader.destroy(existingProduct.cloudinary_id);
            } catch (cloudinaryError) {
                handleCloudinaryError(cloudinaryError);
            }
        }

        await prisma.producto.delete({ where: { id: productId }});
        res.status(204).end();
    } catch (error) {
        handleControllerError(res, error, 'delete');
    }
};

// Función centralizada para manejo de errores
const handleControllerError = (res, error, action) => {
    console.error(`Error en ${action}:`, error);

    if (error.name === 'ZodError') {
        return res.status(400).json({
            error: 'Error de validación',
            detalles: error.errors.map(e => ({
                campo: e.path.join('.'),
                mensaje: e.message
            }))
        });
    }

    const statusCode = error.code === 'P2025' ? 404 : 500;
    const message = statusCode === 404 ? 'Recurso no encontrado' : 'Error interno del servidor';

    res.status(statusCode).json({
        error: message,
        detalles: error.message
    });
};