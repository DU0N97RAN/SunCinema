import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/room";

const routerRoom = Router();

routerRoom.post("/rooms", create);
routerRoom.get("/rooms", list);
routerRoom.get("/rooms/:id", read);
routerRoom.put("/rooms/:id", update);
routerRoom.delete("/rooms/:id", remove);

export default routerRoom;
