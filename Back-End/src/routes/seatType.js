import { Router } from "express";
import { create, list, read, remove, seatBySeatType, update } from "../controllers/seatType";

const router = Router()

router.post("/seatType", create)
router.get("/seatType/:id", read)
router.get("/seatType", list)
router.delete("/seatType/:id", remove)
router.patch("/seatType/:id", update)
router.get("/seatBySeatType/:id", seatBySeatType)

export default router