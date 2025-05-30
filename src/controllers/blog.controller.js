import { prisma } from '../prismaClient.js';
import { blogValidator } from '../validator/blog.validator.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.blogPost.findMany();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener artículos', posts });
    }
};

export const createPost = async (req, res) => {
    try {
        const data = blogValidator.parse(req.body);
        const post = await prisma.blogPost.create({ data });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
};

export const updatePost = async (req, res) => {
    try {
        const data = blogValidator.partial().parse(req.body);
        const post = await prisma.blogPost.update({
            where: { id: Number(req.params.id) },
            data
        });
        res.json(post);
    } catch (error) {
        res.status(404).json({ error: 'Artículo no encontrado' });
    }
};

export const deletePost = async (req, res) => {
    try {
        await prisma.blogPost.delete({
            where: { id: Number(req.params.id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ error: 'Artículo no encontrado' });
    }
};