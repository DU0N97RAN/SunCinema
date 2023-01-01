import { Router } from "express";
import { create, getDetailBySlug, getListPostByCate, getOne, getTop10, list, remove, update } from "../controllers/post";

const router = Router()

router.post("/post", create)
router.get("/post", list)
router.get("/post/top-10", getTop10)
router.get("/post/:id", getOne)
router.get("/post/get-detail-by-slug/:slug", getDetailBySlug);
router.delete("/post/:id", remove)
router.patch("/post/:id", update)
router.get("/post/get-post-by-cate/:slug", getListPostByCate)

export default router;