import Ticket from "../models/ticket";
import TicketDetail from "../models/ticketDetail";
import SetByShowTime from "../models/setByShowTime";

export const create = async (req, res) => {
  try {
    const seatId = req.body.map(item => {
      return item.seatId
    });
    const totalPrice = req.body.reduce((total, currentValue) => {
      return total + currentValue.price
    }, 0);
    const chosenSeat = await TicketDetail.find({ showTimeId: req.body[0].showTimeId, seatId: { $in: seatId } }).exec();
    if (chosenSeat.length) return res.status(401).json("Hiện ghế của bạn chọn đang được giữ, vui lòng chọn ghế khác");
    const ticket = await new Ticket({
      expireAt: Date.now(),
      totalPrice,
      quantity: req.body.length
    }).save();
    req.body = req.body.map(item => {
      return {
        expireAt: ticket.expireAt,
        ...item,
        ticketId: ticket._id
      }
    })
    const ticketDetail = await TicketDetail.insertMany(req.body);
    const populatedDetail = await TicketDetail.populate(ticketDetail, [{ path: "seatId", populate: { path: "roomId" } }, { path: "showTimeId" }]);
    res.json({ ticket, populatedDetail });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "Don't create!",
    });
  }
};

export const list = async (req, res) => {
  try {
    const ticket = await Ticket.find({})
      .exec();
    return res.status(200).json(ticket);
  } catch (error) {
    return res.status(400).json({
      message: "Don't find all!",
    });
  }
};

export const read = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const ticket = await Ticket.findOne(filter)
      .exec();
    return res.status(200).json(ticket);
  } catch (error) {
    return res.status(400).json({
      message: "Don't find one!",
    });
  }
};

export const update = async (req, res) => {
  const filter = { _id: req.params.id };
  const doc = req.body;
  const option = { new: true };
  try {
    const ticket = await Ticket.findOneAndUpdate(filter, doc, option)
      .populate("setByShowTimeId")
      .exec();
    return res.status(200).json(ticket);
  } catch (error) {
    return res.status(400).json({
      message: "Don't update",
    });
  }
};

export const remove = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const ticket = await Ticket.findOneAndDelete(filter).exec();
    return res.status(200).json({
      message: "Delete Success!",
      ticket,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Don't remove!",
    });
  }
};

// export const ticketDetailByTicket = async (req, res) => {
//   try {
//     const ticketId = await Ticket.findOne({ _id: req.params.id }).exec();
//     const ticketDetail = await TicketDetail.find({ ticketId })
//       .select("-ticketId")
//       .exec();
//     res.json({
//       ticketId,
//       ticketDetail,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: `don't find, ${error}`,
//     });
//   }
// };
