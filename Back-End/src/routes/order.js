import express from "express";
import {
  create,
  createPaymentUrl,
  downloadTicket,
  exportExcelAllData,
  getDashBoardData,
  getOrderByShortId,
  getProfitByDate,
  list,
  read,
  remove,
  update,
  vnpayReturn,
  vnpIpn,
} from "../controllers/order";
import { authenticateToken } from "../middlewares/authenticate";

const router = express.Router();

router.get("/order", list);
router.get("/order/:id", read);
router.get("/orderByShortId", getOrderByShortId);
router.post("/order", create);
router.get("/dashboard", getDashBoardData);
router.post("/order/createPaymentUrl", createPaymentUrl);
router.get("/order_vnpay_return", vnpayReturn);
router.get("/order/vnpay_ipn", vnpIpn);
router.put("/order/:id", update);
router.get("/ticket-export/:id", downloadTicket);
router.delete("/order/:id", remove);
router.get("/orders", exportExcelAllData);

export default router;
