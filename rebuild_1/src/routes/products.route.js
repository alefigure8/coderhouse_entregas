import { Router } from "express";
import {getProducts, getProduct, postProduct, putProduct, deleteProductById} from '../controllers/API/products.controller.js';
import {jwtAuthenticateAdmin} from '../middlewares/passport.js';
const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', jwtAuthenticateAdmin, postProduct);
router.put('/:id', jwtAuthenticateAdmin, putProduct);
router.delete('/:id', jwtAuthenticateAdmin, deleteProductById);

export default router;
