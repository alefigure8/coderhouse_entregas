import { Router } from "express";
import { postAuth } from "../controllers/API/auth.controllers.js";

const router = Router();

router.post("/", postAuth);

export default router;