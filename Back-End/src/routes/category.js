import { Router } from "express";
import { create, getPostByCategory, getSlug, list, read, remove, update } from "../controllers/category";

const routerCategory = Router();

routerCategory.post("/categories", create);
routerCategory.get("/categories", list);
routerCategory.get("/categories/:id", read);
routerCategory.get("/categories/get-slug/:slug", getSlug);
routerCategory.put("/categories/:id", update);
routerCategory.delete("/categories/:id", remove);
routerCategory.get('/postByCategory/:id', getPostByCategory)

export default routerCategory;
