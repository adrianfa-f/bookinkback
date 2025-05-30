// validators/testimonial.validator.js
import { z } from 'zod';

export const testimonialValidator = z.object({
    nombre: z.string().min(2).max(50),
    estrellas: z.number().int().min(0).max(5),
    opinion: z.string().min(10).max(500)
});