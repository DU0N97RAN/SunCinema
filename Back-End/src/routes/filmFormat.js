import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controllers/filmFormat";

const router = Router()

router.post("/filmFormat", create)
router.get("/filmFormat/:id", getOne)
router.get("/filmFormat", getAll)
router.delete("/filmFormat/:id", remove)
router.patch("/filmFormat/:id", update)

export default router