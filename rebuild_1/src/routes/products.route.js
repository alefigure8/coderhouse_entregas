import { Router } from "express";

import {getProducts, getProduct, postProduct, putProduct, deleteProductById} from '../controllers/API/products.controller.js';
const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', postProduct);
router.put('/:id', putProduct);
router.delete('/:id', deleteProductById);

export default router;
