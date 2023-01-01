import express from "express"
import { create, list, read, remove, update } from "../controllers/websiteConfig";

const router = express.Router();

router.get("/config", list);
router.post("/config", create);
router.put("/config/:id", update);
router.get("/config/:id", read);
router.delete("/config/:id", remove);

export default router