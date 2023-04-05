import { Router } from "express";
import {getProducts, getProduct, postProduct, putProduct, deleteProductById} from '../controllers/API/products.controller.js';
import {jwtAuthenticate} from '../middlewares/passport.js';
const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', jwtAuthenticate, postProduct);
router.put('/:id', jwtAuthenticate, putProduct);
router.delete('/:id', jwtAuthenticate, deleteProductById);

export default router;
