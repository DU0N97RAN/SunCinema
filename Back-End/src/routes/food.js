import { Router } from "express";
import { create, foodDetailByFood, getAll, getOne, remove, update } from "../controllers/food";

const router = Router()

router.post("/food", create)
router.get("/food/:id", getOne)
router.get("/food", getAll)
router.delete("/food/:id", remove)
router.patch("/food/:id", update)
router.get("/foodDetailByFood/:id", foodDetailByFood)

export default router