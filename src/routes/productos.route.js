import { Router } from 'express';
import { authenticate } from '../auth/auth.middleware.js';
import {
    getProductos,
    getProductosByCategory,
    createProducto,
    updateProducto,
    deleteProducto,
} from '../controllers/productos.controller.js';

const router = Router();

router.get('/', getProductos);
router.get('/:categoria', getProductosByCategory);
router.post('/', authenticate, createProducto);
router.put('/:id', authenticate, updateProducto);
router.delete('/:id', authenticate, deleteProducto);

export default router;