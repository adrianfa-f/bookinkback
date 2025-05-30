import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('Token no proporcionado');
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Acceso no autorizado' });
    }
};