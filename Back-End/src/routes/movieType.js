import { Router } from "express";
import {
  create,
  getNameById,
  list,
  read,
  readMovieOfMovieType,
  remove,
  searchByGenre,
  update,
} from "../controllers/movieType";

const router = Router();

router.post("/movieType", create);
router.get("/movieType/:id", read);
router.get("/movieType", list);
router.delete("/movieType/:id", remove);
router.patch("/movieType/:id", update);
router.get("/movieTypes/:id", readMovieOfMovieType);
router.get("/searchByGenre", searchByGenre)
      .get("/movieType/nameById/:id", getNameById)
export default router;
