import { Router } from "express";
import { create, list, read, remove, seatsByRoom, update, updateSeatByRoom } from "../controllers/seat";

const routerSeat = Router();

routerSeat.post("/seats", create);
routerSeat.get("/seats", list);
routerSeat.get("/seats/:id", read);
routerSeat.get("/seatsByRoom/:roomId", seatsByRoom);
routerSeat.put("/seatsByRoom/:roomId", updateSeatByRoom);
routerSeat.put("/seats/:id", update);
routerSeat.delete("/seats/:id", remove);

export default routerSeat;
