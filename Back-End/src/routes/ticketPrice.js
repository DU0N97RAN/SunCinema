import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/ticketPrice";

const routerTicketPrice = Router();

routerTicketPrice.post("/ticketPrice", create);
routerTicketPrice.get("/ticketPrice", list);
routerTicketPrice.get("/ticketPrice/:id", read);
routerTicketPrice.put("/ticketPrice/:id", update);
routerTicketPrice.delete("/ticketPrice/:id", remove);

export default routerTicketPrice;
