import { Router } from "express";
import {
  getUser,
  postUser,
  putUser,
  deleteUserById,
} from "../controllers/API/users.controller.js";

const router = Router();

router.get("/:id", getUser);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUserById);

export default router;
