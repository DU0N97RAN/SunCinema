import Voucher from "../models/voucher"

export const create = async (req, res) => {
    try {
        const existCode = await Voucher.findOne({ code: req.body.code }).exec()
        if (existCode) {
            return res.status(500).json({
                message: "Voucher đã tồn tại"
            })
        }
        const voucher = await new Voucher(req.body).save()
        res.status(200).json(voucher)
    } catch (error) {
        res.status(400).json({
            message: `Don't create, ${error} `
        })
    }
}

export const list = async (req, res) => {
    try {
        const voucher = await Voucher.find({}).populate(["userId"]).exec()
        res.status(200).json(voucher)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error} `
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const voucher = await Voucher.findOne({ _id: req.params.id }).exec()
        res.status(200).json(voucher)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error} `
        })
    }
}

export const remove = async (req, res) => {
    try {
        const voucher = await Voucher.findOneAndRemove({ _id: req.params.id }).exec()
        res.status(200).json(voucher)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error} `
        })
    }
}

export const update = async (req, res) => {
    try {
        const voucher = await Voucher.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
        res.status(200).json(voucher)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error} `
        })
    }
}
export const reedeem = async (req, res) => {
    try {
        const userVoucher = await Voucher.findOne({ code: req.body.code, userId: req.body.userId }).exec();
        if (!userVoucher) return res.status(200).json("Voucher này không khả dụng hoặc đã được sử dụng rồi");
        if (userVoucher.timeStart > Date.now() || userVoucher.timeEnd < Date.now()) return res.status(200).json("Voucher này chưa đến thời điểm sử dụng hoặc đã hết hạn");
        if (userVoucher.voucherVal > req.body.orderVal) return res.status(200).json(`Bạn cần mua trên ${userVoucher.voucherVal.toLocaleString("de-DE", { style: 'currency', currency: 'VND' })} để sử dụng voucher này`);
        if (userVoucher.quantity < 1) return res.status(200).json("Voucher này của bạn đã hết lượt sử dụng");
        const userIdList = userVoucher.userId.filter(item => item != req.body.userId);
        const voucher = await Voucher.findOneAndUpdate({ _id: userVoucher._id }, { userId: userIdList, quantity: userVoucher.quantity - 1 }, { new: true }).exec();
        let discountValue = userVoucher.condition ? userVoucher.conditionNumber : (req.body.orderVal * userVoucher.conditionNumber / 100);
        discountValue = discountValue > userVoucher.voucherLimit ? userVoucher.voucherLimit : discountValue;
        res.status(200).json({ voucher, discountValue });
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error} `
        })
    }
}
