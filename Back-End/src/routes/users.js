import express from "express"
import { forgotPassword, list, login, read, register, remove, update, updatePassword } from "../controllers/user";
import { authenticateToken } from "../middlewares/authenticate";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", list);
router.get("/users/:id", authenticateToken, read);
router.put("/users/:id", authenticateToken, update);
router.put("/userVerify", authenticateToken, update);
router.delete("/users/:id", authenticateToken, remove);
router.put("/users_password_update", authenticateToken, updatePassword);
router.post("/users_forgot_password", forgotPassword);

export default router;