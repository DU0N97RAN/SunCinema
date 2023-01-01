import { Router } from "express";
import {
  create,
  getOne,
  getSlug,
  list,
  pagination,
  remove,
  update,
  searchByMovieName,
} from "../controllers/movie";

const router = Router();
router.post("/movie", create);
router.get("/movie", list);
router.get("/movie/:id", getOne);
router.get("/movies/:slug", getSlug);
router.delete("/movie/:id", remove);
router.patch("/movie/:id", update);
router.get("/movies", pagination);
router.get("/searchByMovieName", searchByMovieName);

export default router;
