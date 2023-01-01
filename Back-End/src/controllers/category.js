import slugify from "slugify";
import Category from "../models/category";
import Post from "../models/post";

export const create = async (req, res) => {
  req.body.slug = slugify(req.body.title)
  try {
    const category = await new Category(req.body).save();
    res.json(category);
  } catch (error) {
    res.status(400).json({
      message: "Không thêm được thể loại",
    });
  }
};

export const list = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({
      message: "Không có thể loại nào!",
    });
  }
};

export const read = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const category = await Category.findOne(filter).exec();
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({
      message: "Không có thể loại!",
    });
  }
};

export const getSlug = async (req, res) => {
  try {
    const category = await Category.findOne( {slug: req.params.slug} ).exec();
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({
      message: `Không có thể loại! , ${error}`,
    });
  }
};


export const update = async (req, res) => {
  req.body.slug = slugify(req.body.title)
  const filter = { _id: req.params.id };
  const doc = req.body;
  const option = { new: true };
  try {
    const category = await Category.findOneAndUpdate(
      filter,
      doc,
      option
    ).exec();
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({
      message: "Không sửa được thể loại!",
    });
  }
};

export const remove = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const category = await Category.findOneAndDelete(filter).exec();
    return res.status(200).json({
      message: "Xóa thành công!",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Không xóa được thể loại!",
    });
  }
};

export const getPostByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({_id: req.params.id}).exec()
    const post = await Post.find({categoryId:category}).select("-categoryId").exec()
    res.json({
      category,
      post
    })
  } catch (error) {
    res.status(400).json({
    message: `Don't find, ${error}`
  })
  }
}
