import { Router } from "express";
import { create, list, getOne, remove, update, getSlug } from "../controllers/slider";

const router = Router();

router.post('/slider', create)
router.get('/slider', list)
router.get('/slider/:id', getOne)
router.get('/sliders/:slug', getSlug)
router.delete('/slider/:id', remove)
router.patch('/slider/:id', update)

export default router