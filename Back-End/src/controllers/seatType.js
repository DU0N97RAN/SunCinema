import SeatType from "../models/seatType"
import Seat from "../models/seat"

export const create = async (req, res) => {
    try {
        const existSeatType = await SeatType.findOne({name: req.body.name}).exec()
        if(existSeatType){
            return res.status(500).json({
                message:"Loại ghế đã tồn tại"
            })
        }
        const seatType = await SeatType(req.body).save()
        res.json(seatType)
    } catch (error) {
        res.status(400).json({
            error,
            message: `${error}`
        })
    }
} 

export const read = async (req, res) => {
    try {
        const seatType = await SeatType.findOne({_id: req.params.id}).exec()
        res.json(seatType)
    } catch (error) {
        res.status(400).json({
            message: "Don't find"
        })
    }
}

export const list = async (req, res) => {
    try {
        const seatType = await SeatType.find({}).exec()
        res.json(seatType)
    } catch (error) {
        res.status(400).json({
            message: "Don't find"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const seatType = await SeatType.findOneAndRemove({_id: req.params.id}).exec()
        res.json(seatType)
    } catch (error) {
        res.status(400).json({
            message: "Don't find"
        })
    }
}

export const update = async (req, res) => {
    try {
        const seatType = await SeatType.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).exec()
        res.json(seatType)
    } catch (error) {
        res.status(400).json({
            message: "Don't find"
        })
    }
}

export const seatBySeatType = async (req, res) => {
    try {
        const seatType = await SeatType.findOne({_id: req.params.id}).exec()
        const seat = await Seat.find({seatTypeId:seatType}).select("-seatTypeId").exec()
        res.json({
            seatType,
            seat
        })
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error}`
        })
    }
}