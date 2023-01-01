import { Router } from "express";
import { create, showTimeFilter, list, read, remove, update } from "../controllers/showTime";

const routerShowTime = Router();

routerShowTime.post("/showTime", create);
routerShowTime.get("/showTime", list);
routerShowTime.get("/showTime/:id", read);
routerShowTime.put("/showTime/:id", update);
routerShowTime.delete("/showTime/:id", remove);

export default routerShowTime;
