// src/validators/producto.validator.js
import { z } from 'zod';

// Expresión regular para URLs de Cloudinary
const cloudinaryUrlRegex = /^https:\/\/res\.cloudinary\.com\/.+\/.+\.(?:jpg|jpeg|png|webp|gif|svg)(?:\?.*)?$/;

// Esquema base para entrada de productos (frontend)
const productoInputSchema = z.object({
    titulo: z.string()
        .min(3, "El título debe tener al menos 3 caracteres")
        .max(100, "El título no puede exceder 100 caracteres"),
    
    descripcion: z.string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(500, "La descripción no puede exceder 500 caracteres"),
    
    imagen: z.string()
        .regex(cloudinaryUrlRegex, "URL de Cloudinary inválida")
        .startsWith("https://", { message: "La URL debe ser segura (HTTPS)" }),
    
    precio: z.coerce.number()
        .positive("El precio debe ser un número positivo")
        .max(10000, "El precio máximo permitido es 10,000")
        .transform(n => Number(n.toFixed(2))),
    
    categoria: z.enum(
        ['TAPA_DURA', 'TAPA_BLANDA', 'CIEN_CITAS', 'SERVICIOS'], 
        { message: "Categoría no válida" }
    ),
    
    cloudinary_id: z.string()
        .min(1, "Se requiere ID de Cloudinary")
        .regex(/^[\w-]+(\/[\w-]+)*$/, "Formato de ID Cloudinary inválido")
});

// Validador para creación de productos
export const crearProductoValidator = productoInputSchema;

// Validador para actualización de productos
export const actualizarProductoValidator = productoInputSchema
    .partial()
    .refine(data => Object.keys(data).length > 0, {
        message: "Debe proporcionar al menos un campo para actualizar"
    });

// Validador para respuesta completa (incluye campos generados por DB)
export const productoValidator = productoInputSchema.extend({
    id: z.number()
});