import { z } from 'zod';

export const blogValidator = z.object({
    titulo: z.string().min(5).max(100),
    imagen: z.string().url(),
    contenido: z.string().min(50),
    enlaces: z.array(z.string().url()).optional()
});