import TicketPrice from "../models/ticketPrice";

export const create = async (req, res) => {
  try {
    const existTicketPrice = await TicketPrice.findOne({name: req.body.name}).exec()
    if(existTicketPrice){
      return res.status(500).json({
        message: "Vé đã tồn tại"
      })
    }
    const ticketPrice = await new TicketPrice(req.body).save();
    res.json(ticketPrice);
  } catch (error) {
    res.status(400).json({
      message: "Don't create!",
    });
  }
};

export const list = async (req, res) => {
  try {
    const ticketPrice = await TicketPrice.find({}).exec();
    return res.status(200).json(ticketPrice);
  } catch (error) {
    return res.status(400).json({
      message: "Don't find all!",
    });
  }
};

export const read = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const ticketPrice = await TicketPrice.findOne(filter).exec();
    return res.status(200).json(ticketPrice);
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
    const ticketPrice = await TicketPrice.findOneAndUpdate(
      filter,
      doc,
      option
    ).exec();
    return res.status(200).json(ticketPrice);
  } catch (error) {
    return res.status(400).json({
      message: "Don't update",
    });
  }
};

export const remove = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const ticketPrice = await TicketPrice.findOneAndDelete(filter).exec();
    return res.status(200).json({
      message: "Delete Success!",
      ticketPrice,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Don't remove!",
    });
  }
};
