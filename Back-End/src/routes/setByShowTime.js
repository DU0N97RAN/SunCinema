import { Router } from "express";
import {
  create,
  list,
  read,
  remove,
  update,
} from "../controllers/setByShowTime";

const routerSetByShowTime = Router();

routerSetByShowTime.post("/setByShowTime", create);
routerSetByShowTime.get("/setByShowTime", list);
routerSetByShowTime.get("/setByShowTime/:id", read);
routerSetByShowTime.put("/setByShowTime/:id", update);
routerSetByShowTime.delete("/setByShowTime/:id", remove);

export default routerSetByShowTime;
