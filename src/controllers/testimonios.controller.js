import { prisma } from '../prismaClient.js';
import { testimonialValidator } from '../validator/testimonial.validator.js';

export const getTestimonios = async (req, res) => {
    try {
        const testimonios = await prisma.testimonial.findMany();
        res.json(testimonios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener testimonios' });
    }
};

export const createTestimonio = async (req, res) => {
    try {
        const data = testimonialValidator.parse(req.body);
        const testimonio = await prisma.testimonial.create({ data });
        res.status(201).json(testimonio);
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
};

export const deleteTestimonio = async (req, res) => {
    try {
        await prisma.testimonial.delete({
            where: { id: Number(req.params.id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ error: 'Testimonio no existente' });
    }
};