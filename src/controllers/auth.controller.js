import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prismaClient.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) throw new Error('Credenciales inválidas: no email');

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) throw new Error('Credenciales inválidas: no password');

        const token = jwt.sign(
            { id: admin.id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};