import { Router } from "express";
import { create, getOne, list, reedeem, remove, update } from "../controllers/voucher";

const router = Router()

router.post("/voucher", create)
router.get("/voucher", list)
router.get("/voucher/:id", getOne)
router.delete("/voucher/:id", remove)
router.patch("/voucher/:id", update)
router.put("/voucher/reedeem", reedeem)

export default router