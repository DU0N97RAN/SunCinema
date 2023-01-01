import TicketDetail from "../models/ticketDetail";

export const create = async (req, res) => {
    try {
        const ticketDetail = await new TicketDetail(req.body).save()
        res.json(ticketDetail)
    } catch (error) {
        res.status(400).json({
            message: "Don't create"
        })
    }
}

export const list = async (req, res) => {
    try {
        const ticketDetail = await TicketDetail.find({}).populate('ticketId').exec();
        res.json(ticketDetail)
    } catch (error) {
        res.status(400).json({
            message: "not find"
        })
    }
}

export const getTicketDetailByShowTime = async (req, res) => {
    try {
        const ticketDetail = await TicketDetail.find({ showTimeId: req.query.showTimeId }).populate({
            path: "showTimeId",
        }).exec();
        const filterRoom = ticketDetail.filter(item => item.showTimeId.roomId != req.query.roomId);
        res.json(filterRoom)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "not find"
        })
    }
}

export const read = async (req, res) => {
    try {
        const ticketDetail = await TicketDetail.findOne({ _id: req.params.id }).populate('ticketId').exec();
        res.json(ticketDetail)
    } catch (error) {
        res.status(400).json({
            message: "not find"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const ticketDetail = await TicketDetail.findOneAndRemove({ _id: req.params.id }).exec()
        res.json(ticketDetail)
    } catch (error) {
        res.status(400).json({
            message: "not find"
        })
    }
}

export const update = async (req, res) => {
    try {
        const ticketDetail = await TicketDetail.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
        res.json(ticketDetail)
    } catch (error) {
        res.status(400).json({
            message: "not find"
        })
    }
}