import { Router } from "express";
import { create, list, read, remove, ticketDetailByTicket, update } from "../controllers/ticket";

const routerTicket = Router();

routerTicket.post("/tickets", create);
routerTicket.get("/tickets", list);
routerTicket.get("/tickets/:id", read);
routerTicket.put("/tickets/:id", update);
routerTicket.delete("/tickets/:id", remove);
// routerTicket.get("/ticketDetailByTicket/:id", ticketDetailByTicket)

export default routerTicket;
