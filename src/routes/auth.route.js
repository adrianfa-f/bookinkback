import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { authenticate } from '../auth/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.get('/me', authenticate, (req, res) => {
    res.json({ admin: req.admin });
});

export default router;