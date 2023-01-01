import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/foodDetail";

const router = Router()

router.post("/foodDetail", create)
router.get("/foodDetail", list)
router.get("/foodDetail/:id", read)
router.delete("/foodDetail/:id", remove)
router.patch("/foodDetail/:id", update)

export default router