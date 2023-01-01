import { Router } from "express";
import {
  create,
  list,
  listByMovies,
  read,
  remove,
  update,
} from "../controllers/comment";

const routerComment = Router();

routerComment.post("/comment", create);
routerComment.get("/comment", list);
routerComment.get("/comments", listByMovies);
routerComment.get("/comment/:id", read);
routerComment.delete("/comment/:id", remove);
routerComment.put("/comment/:id", update);

export default routerComment;
