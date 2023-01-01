import Order from "../models/order";
import Ticket from "../models/ticket";
import TicketDetail from "../models/ticketDetail";
import QRCode from "qrcode";
import Excel from "exceljs";
import shortid from "shortid";
import path from "path";
import { sortObject } from "../utils/sortObj";
import querystring from "qs";
import crypto from "crypto";
import format from "date-format"
import sendEmail from "../utils/email";
import ticketDetail from "../models/ticketDetail";
import movie from "../models/movie";
import seatType from "../models/seatType";
import fs from "fs";
import pdf from "pdf-creator-node"
import console from "console";
import Food from "../models/food";
import FoodDetail from "../models/foodDetail";

export const create = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.body.ticketId }).exec();
    if (!ticket) return res.status(404).json("Rất tiếc, thời hạn chờ đặt vé đã kết thúc, vui lòng đặt vé lại");
    await Ticket.updateOne({ _id: req.body.ticketId }, { $unset: { expireAt: "" } });
    await TicketDetail.updateMany({ ticketId: req.body.ticketId }, { $unset: { expireAt: "" } });
    req.body.shortId = shortid.generate();
    req.body.qrCode = await QRCode.toDataURL(`${process.env.CLIENT_URL}/order/${req.body.shortId}`);
    const order = await new Order(req.body).save();
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Tạo đơn hàng thất bại" });
  }
};

export const list = async (req, res) => {
  try {
    const order = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("ticketId")
      .populate("foodDetailId")
      .exec();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: "Lấy danh sách đơn hàng thất bại" });
  }
};

export const getDashBoardData = async (req, res) => {
  const date = new Date();
  var start = new Date(date.getFullYear(), 0, 0);
  var diff = date - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);

  try {
    const profit = await Order.aggregate([
      { $match: { status: { $in: [1, 3] } } },
      {
        $addFields: {
          createdAtDate: {
            $toDate: "$createdAt"
          },

        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAtDate"
            }
          },
          profit: {
            $sum: "$totalPrice"
          }
        }
      },
      {
        $project: {
          profit: 1,
          date: "$_id",
          _id: 0,

        }
      },
      { $sort: { date: 1 } }
    ]).exec();
    const profitByMoth = await Order.aggregate([
      { $match: { status: { $in: [1, 3] } } },
      {
        $addFields: {
          createdAtDate: {
            $toDate: "$createdAt"
          },

        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$createdAtDate"
            }
          },
          profit: {
            $sum: "$totalPrice"
          }
        }
      },
      {
        $project: {
          profit: 1,
          date: "$_id",
          _id: 0,

        }
      },
      { $sort: { date: 1 } }
    ]).exec();
    const profitByYear = await Order.aggregate([
      { $match: { status: { $in: [1, 3] } } },
      {
        $addFields: {
          createdAtDate: {
            $toDate: "$createdAt"
          },

        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y",
              date: "$createdAtDate"
            }
          },
          profit: {
            $sum: "$totalPrice"
          }
        }
      },
      {
        $project: {
          profit: 1,
          date: "$_id",
          _id: 0,

        }
      },
      { $sort: { date: 1 } }
    ]).exec();
    const topMovieProfit = await movie.find().sort({ "profit": -1 }).select(["name", "profit"]).exec();
    const companyProfit = await Order.aggregate([
      {
        $lookup: {
          from: "tickets", // name of the foreign collection
          localField: "ticketId",
          foreignField: "_id",
          as: "ticket-data"
        }
      },
      {
        $lookup: {
          from: "fooddetails", // name of the foreign collection
          localField: "foodDetailId",
          foreignField: "_id",
          as: "food-data"
        }
      },
      {
        "$addFields": {
          "ticketTotal": {
            "$sum": "$ticket-data.totalPrice"
          },
          "foodTotal": {
            "$sum": "$food-data.totalPrice"
          }
        }
      },
      { $match: { status: { $in: [1, 3] } } },
      { $group: { _id: null, ticketTotal: { $sum: "$ticketTotal" }, foodTotal: { $sum: "$foodTotal" } } }
    ]).exec();
    const monthProfit = await Order.aggregate([
      {
        $addFields: {
          month: {
            $dateToString: {
              format: "%Y-%m",
              date: "$createdAt"
            }
          }
        }
      },
      { $match: { status: { $in: [1, 3] }, month: format.asString("yyyy-MM", date) } },
      { $group: { _id: null, mothTotal: { $sum: "$totalPrice" } } }
    ]).exec();
    const yearProfit = await Order.aggregate([
      { $addFields: { year: { $year: '$createdAt' } } },
      { $match: { status: { $in: [1, 3] }, year: date.getYear() + 1900 } },
      { $group: { _id: null, yearTotal: { $sum: "$totalPrice" } } }
    ]).exec();
    const dayProfit = await Order.aggregate([
      {
        $addFields: {
          dayOfYear: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          }
        }
      },
      { $match: { status: { $in: [1, 3] }, dayOfYear: format.asString("yyyy-MM-dd", date) } },
      { $group: { _id: null, dayTotal: { $sum: "$totalPrice" } } }
    ]).exec();
    const ticketCount = await TicketDetail.aggregate([
      {
        $lookup: {
          from: "orders", // name of the foreign collection
          localField: "ticketId",
          foreignField: "ticketId",
          as: "order"
        }
      },
      {
        $lookup: {
          from: "seats", // name of the foreign collection
          localField: "seatId",
          foreignField: "_id",
          as: "seat"
        }
      },
      {
        $addFields: {
          orderStatus: "$order.status"
        }
      },
      {
        $addFields: {
          seatType: "$seat.seatTypeId"
        }
      },
      { $match: { orderStatus: { $in: [1, 3] } } },
      { $group: { _id: "$seatType", count: { $sum: 1 } } }
    ]).exec();
    await seatType.populate(ticketCount, { path: "_id", select: "name" });
    return res.status(200).json({ profit, topMovieProfit, companyProfit, monthProfit, yearProfit, dayProfit, profitByMoth, ticketCount, profitByYear });
  } catch (error) {
    return res.status(400).json(error);

  }
}

export const getOrderByShortId = async (req, res) => {
  try {
    const order = await Order.findOne({ shortId: req.query.shortId })
      .populate("userId")
      .populate("ticketId")
      .populate({ path: "foodDetailId", populate: { path: "food", populate: "foodId" } })
      .exec();
    const tickets = await ticketDetail.find({ ticketId: order.ticketId?._id }).populate({ path: "seatId", model: "Seat", populate: { path: "roomId", model: "Room" } }).populate({ path: "showTimeId", model: "ShowTime", populate: { path: "movieId", model: "Movie" } }).exec();
    const seats = tickets.map(item => `${item.seatId.row}${item.seatId.column}`).join(",");
    const foods = order.foodDetailId ? order?.foodDetailId?.food.map(item => `${item.foodId.name} x ${item.quantity}`).join(",") : "Không có";
    const payload = [{
      movie: tickets[0]?.showTimeId?.movieId.name,
      poster: tickets[0]?.showTimeId?.movieId.image,
      startAt: tickets[0]?.showTimeId?.startAt,
      endAt: tickets[0]?.showTimeId?.endAt,
      seats: seats,
      foods: foods,
      room: tickets[0]?.seatId?.roomId?.name,
      totalPrice: order.totalPrice.toLocaleString("de-DE", { style: 'currency', currency: 'VND' })
    }];
    res.status(200).json({ order, detail: payload });
  } catch (error) {
    res.status(400).json({ message: "Lấy danh sách đơn hàng thất bại" });
  }
};



export const read = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id })
      .populate("userId")
      .populate("ticketId")
      .populate({ path: "foodDetailId", populate: { path: "food", populate: "foodId" } })
      .exec();
    const tickets = await ticketDetail.find({ ticketId: order.ticketId?._id }).populate({ path: "seatId", model: "Seat", populate: { path: "roomId", model: "Room" } }).populate({ path: "showTimeId", model: "ShowTime", populate: { path: "movieId", model: "Movie" } }).exec();
    const seats = tickets.map(item => `${item.seatId.row}${item.seatId.column}`).join(",");
    const foods = order.foodDetailId ? order?.foodDetailId?.food.map(item => `${item.foodId.name} x ${item.quantity}`).join(",") : "Không có";
    const payload = [{
      movie: tickets[0]?.showTimeId?.movieId.name,
      poster: tickets[0]?.showTimeId?.movieId.image,
      startAt: tickets[0]?.showTimeId?.startAt,
      endAt: tickets[0]?.showTimeId?.endAt,
      seats: seats,
      foods: foods,
      room: tickets[0]?.seatId?.roomId?.name,
      totalPrice: order.totalPrice.toLocaleString("de-DE", { style: 'currency', currency: 'VND' })
    }];

    res.status(200).json({ order, detail: payload });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Lấy thông tin đơn hàng thất bại" });
  }
};


export const downloadTicket = async (req, res) => {
  try {
    const updateOrder = await Order.findOneAndUpdate({ _id: req.params.id, status: 1 }, { status: 3 }, { new: true }).exec();
    if (!updateOrder) return res.status(400).json("Không thể xuất vé cho đơn hàng này")
    const tickets = await ticketDetail.find({ ticketId: updateOrder.ticketId }).populate({ path: "seatId", model: "Seat", populate: [{ path: "roomId", model: "Room" }, { path: "seatTypeId" }] }).populate({ path: "showTimeId", model: "ShowTime", populate: { path: "movieId", model: "Movie" } }).exec();
    var html = fs.readFileSync(__dirname + "/template.html", "utf8");
    var options = {
      format: "A4",
      orientation: "landscape"
    };
    const payload = tickets.map(item => {
      return {
        movie: item.showTimeId.movieId.name,
        date: format.asString('dd/MM/yyyy', tickets[0]?.showTimeId?.startAt),
        endAt: format.asString('hh:mm', tickets[0]?.showTimeId?.endAt),
        startAt: format.asString('hh:mm', tickets[0]?.showTimeId?.startAt),
        seatType: item.seatId.seatTypeId.name,
        column: item.seatId.column,
        row: item.seatId.row,
        room: item.seatId.roomId.name,
        price: item.price,
        qrCode: updateOrder.qrCode
      }
    })
    var document = {
      html: html,
      data: {
        tickets: payload,
      },
      path: `./docs/${updateOrder._id}.pdf`,
      type: "",
    };
    pdf.create(document, options)
      .then((result) => {
        res.download(result.filename);
      })
      .catch((error) => {
        console.log(error)
      });
  } catch (error) {
    res.statuts(400).json("Xuất vé thất bại")
  }
}

export const update = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: "Cập nhật thông tin đơn hàng thất bại" });
  }
};

export const remove = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete({ _id: req.params.id }).exec();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: "Xóa đơn hàng thất bại" });
  }
};

export const exportExcelAllData = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate({ path: "userId", select: "-_id, username" })
      .populate({ path: "ticketId", select: "-_id, quantity" })
      .populate({ path: "foodDetailId", select: "-_id, totalPrice" })
      .exec();
    if (orders) {
      try {
        const style = { font: { bold: true } };
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet();
        worksheet.columns = [
          {
            header: "User ID",
            key: "userId",
            width: 60,
            style: style,
          },
          {
            header: "Short ID",
            key: "shortId",
            width: 20,
            style: style,
          },
          {
            header: "QR Code",
            key: "qrCode",
            width: 20,
            style: style,
          },
          {
            header: "Total Price",
            key: "totalPrice",
            width: 10,
            style: style,
          },
          {
            header: "Status",
            key: "status",
            width: 7,
            style: style,
          },
          {
            header: "Ticket ID",
            key: "ticketId",
            width: 15,
            style: style,
          },
          {
            header: "Food Detail ID",
            key: "foodDetailId",
            width: 25,
            style: style,
          },
          {
            header: "Created At",
            key: "createdAt",
            width: 12,
            style: style,
          },
          {
            header: "Updated At",
            key: "updatedAt",
            width: 12,
            style: style,
          },
        ];
        worksheet.addRows(orders);

        workbook.xlsx.writeFile("list order.xlsx");
        res.sendFile(path.join(__dirname, "../list order.xlsx"));
        return res.status(200).json(orders);
      } catch (error) {
        return res.status(400).json({
          message: "Export excel fail!",
        });
      }
    }
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json({ message: "Lấy danh sách đơn hàng thất bại" });
  }
};

export const createPaymentUrl = async (req, res, next) => {
  try {
    const duplicateOrder = await Order.findOne({ ticketId: req.body.ticketId }).exec();
    if (duplicateOrder) return res.status(400).json("Vé này đã được đặt, vui lòng đặt lại");
    req.body.shortId = shortid.generate();
    req.body.qrCode = await QRCode.toDataURL(`${process.env.CLIENT_URL}/checkOrder/${req.body.shortId}`);
    const order = await new Order(req.body).save();
    var ipAddr = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    var tmnCode = process.env.vnp_TmnCode;
    var secretKey = process.env.vnp_HashSecret;
    var vnpUrl = process.env.vnp_Url;
    var returnUrl = process.env.vnp_ReturnUrl;

    var createDate = format.asString('yyyyMMddhhmmss', new Date());
    var orderId = order._id;
    var orderType = "billpayment";
    var amount = order.totalPrice;
    var bankCode = req.body.bankCode;
    var orderInfo = req.body.orderDescription;
    var locale = req.body.language;
    if (locale === null || locale === '') {
      locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = '';
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    res.json(vnpUrl)
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Tạo đơn hàng thất bại" });
  }

};

export const vnpayReturn = async (req, res, next) => {
  var vnp_Params = req.query;

  var secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  var tmnCode = process.env.vnp_TmnCode;
  var secretKey = process.env.vnp_HashSecret;

  var signData = querystring.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    var orderId = vnp_Params['vnp_TxnRef'];
    var rspCode = vnp_Params['vnp_ResponseCode'];
    if (rspCode == "00") {
      const order = await Order.findOne({ _id: orderId }).populate("ticketId").exec();
      if (!order.ticketId) return res.status(404).json("Rất tiếc, thời hạn chờ đặt vé đã kết thúc, vui lòng đặt vé lại");
      await Ticket.updateOne({ _id: order.ticketId._id }, { $unset: { expireAt: "" } });
      await TicketDetail.updateMany({ ticketId: order.ticketId._id }, { $unset: { expireAt: "" } });
      const updateOrder = await Order.findOneAndUpdate({ _id: orderId }, { status: 1 }, { new: true }).populate("userId").populate({ path: "foodDetailId", populate: { path: "food", populate: "foodId" } }).populate("ticketId").exec();
      const tickets = await ticketDetail.find({ ticketId: updateOrder.ticketId }).populate({ path: "seatId", model: "Seat", populate: { path: "roomId", model: "Room" } }).populate({ path: "showTimeId", model: "ShowTime", populate: { path: "movieId", model: "Movie" } }).exec();
      await movie.findOneAndUpdate({ _id: tickets[0].showTimeId.movieId._id }, { $inc: { "profit": updateOrder.ticketId.totalPrice } }).exec();
      if (updateOrder.foodDetailId.food.length) {
        let bulkArr = [];

        for (const i of updateOrder.foodDetailId.food) {
          bulkArr.push({
            updateOne: {
              "filter": { "_id": i.foodId._id },
              "update": { $inc: { "stock": - i.quantity } }
            }
          })
        }
        Food.bulkWrite(bulkArr)
      }

      const foods = updateOrder.foodDetailId.food.length ? updateOrder?.foodDetailId?.food.map(item => `${item.foodId.name} x ${item.quantity}`).join(",") : "Không có";
      const seats = tickets.map(item => `${item.seatId.row}${item.seatId.column}`).join(",");
      const payload = [{
        movie: tickets[0]?.showTimeId?.movieId.name,
        poster: tickets[0]?.showTimeId?.movieId.image,
        date: format.asString('dd/MM/yyyy - hh:mm', tickets[0]?.showTimeId?.startAt),
        seats: seats,
        foods: foods,
        room: tickets[0]?.seatId?.roomId?.name,
        qrCode: updateOrder.qrCode,
        shortId: updateOrder.shortId,
        totalPrice: updateOrder.totalPrice.toLocaleString("de-DE", { style: 'currency', currency: 'VND' })
      }];
      // res.status(200).json({ message: "Thanh toán thành công", updateOrder });
      await sendEmail(updateOrder.userId.email, "Đơn hàng được đặt thành công", "", "", payload);
      res.redirect(`${process.env.CLIENT_URL}/payment-status?status=success&orderId=${updateOrder._id}`)
    }
    else {
      const updateOrder = await Order.findOneAndUpdate({ _id: orderId }, { status: 2 }, { new: true }).exec();
      res.redirect(`${process.env.CLIENT_URL}/payment-status?status=failed`)
    }
  } else {
    const updateOrder = await Order.findOneAndUpdate({ _id: orderId }, { status: 2 }, { new: true }).exec();
    res.redirect(`${process.env.CLIENT_URL}/payment-status?status=failed`)
  }
};
export const vnpIpn = (req, res, next) => {
  var vnp_Params = req.query;
  var secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  var tmnCode = process.env.vnp_TmnCode;
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
  if (secureHash === signed) {
    var orderId = vnp_Params['vnp_TxnRef'];
    var rspCode = vnp_Params['vnp_ResponseCode'];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: '00', Message: 'success' })
  }
  else {
    res.status(200).json({ RspCode: '97', Message: 'Fail checksum' })
  }
};