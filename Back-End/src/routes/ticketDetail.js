import { Router } from "express";
import { create, getTicketDetailByShowTime, list, read, remove, update } from "../controllers/ticketDetail";

const router = Router()

router.post("/ticketDetail", create)
router.get("/ticketDetail", list)
router.get("/getTicketDetailByShowTime", getTicketDetailByShowTime)
router.get("/ticketDetail/:id", read)
router.delete("/ticketDetail/:id", remove)
router.patch("/ticketDetail/:id", update)

export default router