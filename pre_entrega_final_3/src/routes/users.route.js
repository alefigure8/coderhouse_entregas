import { Router } from "express";
import {
  getUser,
  postUser,
  putUser,
  deleteUserById,
} from "../controllers/API/users.controller.js";

import {jwtAuthenticate} from '../middlewares/passport.js'

const router = Router();

router.get("/:id", jwtAuthenticate, getUser);
router.post("/", postUser);
router.put("/:id", jwtAuthenticate, putUser);
router.delete("/:id", jwtAuthenticate, deleteUserById);

export default router;
