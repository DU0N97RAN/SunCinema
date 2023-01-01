import Post from "../models/post"
import Category from "../models/category";
import slugify from "slugify";

export const create = async (req, res) => {
    req.body.slug = slugify(req.body.title);
    try {
        const existPost = await Post.findOne({title: req.body.title}).exec()
        if(existPost){
            res.status(500).json({
                message: "Bài viết đã tồn tại"
            })
        }
        const post = await Post(req.body).save()
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({
            message: `Don't create, ${error}`
        })
    }
}

export const list = async (req, res) => {
    try {
        const post = await Post.find({}).populate("userId").populate("categoryId").exec()
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error}`
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id}).populate("userId").exec()
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error}`
        })
    }
}

export const getDetailBySlug = async (req, res) => {
    try {
      const post = await Post.findOne({ slug: req.params.slug }).populate("userId").populate("categoryId").exec();
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json({
        message: `Not Found Post, ${error}`,
      });
    }
  };

export const remove = async (req, res) => {
    try {
        const post = await Post.findOneAndRemove({_id: req.params.id}).exec()
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error}`
        })
    }
}

export const update = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title);
        const post = await Post.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}).exec()
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error}`
        })
    }
}

export const getListPostByCate = async (req, res) => {
    try {
    const categorySlug= await Category.findOne({ slug: req.params.slug }).exec();
    const post = await Post.find({categoryId:categorySlug}).populate("categoryId").exec()
    res.status(200).json({
        post
    })
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error}`
        })
    }
}

export const getTop10 = async (req, res) => {
    try {
        const post = await Post.find({}).limit(10).exec()
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error}`
        })
    }
}

