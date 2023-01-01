import webConfig from "../models/webConfig";

export const create = async (req, res) => {
  try {
    const config = await new webConfig(req.body).save();
    res.status(200).json(config);
  } catch (error) {
    res.status(400).json("Tạo cấu hình trang web không thành công");
  }
}
export const read = async (req, res) => {
  try {
    const config = await webConfig.findOne({ _id: req.params.id }).exec();
    res.status(200).json(config);
  } catch (error) {
    res.status(400).json("Lấy cấu hình trang web không thành công");
  }
}
export const update = async (req, res) => {
  try {
    const config = await webConfig.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
    res.status(200).json(config);
  } catch (error) {
    res.status(400).json("Cập nhật cấu hình trang web không thành công");
  }
}
export const remove = async (req, res) => {
  try {
    const config = await webConfig.findOneAndRemove({ _id: req.params.id }).exec();
    res.status(200).json(config);
  } catch (error) {
    res.status(400).json("Xóa cấu hình trang web không thành công");
  }
}
export const list = async (req, res) => {
  try {
    const config = await webConfig.find({}).exec();
    res.status(200).json(config);
  } catch (error) {
    res.status(400).json("Lấy cấu hình trang web không thành công");
  }
}
