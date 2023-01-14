import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Estoy en el router de Cart");
});

export default router;
