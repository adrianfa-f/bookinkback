import { Router } from 'express';
import { getTestimonios, createTestimonio, deleteTestimonio } from '../controllers/testimonios.controller.js';

const router = Router();

router.get('/', getTestimonios);
router.post('/', createTestimonio);
router.delete('/:id', deleteTestimonio)

export default router;