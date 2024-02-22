const photoModel = require("../models/photo.model");

const   addPhoto = async (req, res) => {
  try {
    const { createdBy } = req.body;
    if (req.file) {
      await photoModel.create({ path: req.file.filename, createdBy });
      res.status(201).json({ message: "Success" });
    } else {
      res.status(400).json({ message: "Image only" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const up = async (req, res) => {
  try {
    const { post_id, createdBy } = req.body;
    const post = await photoModel.findOne({ _id: post_id, up: createdBy });
    if (post) {
      await photoModel.findByIdAndUpdate(post_id, {
        $inc: { count: -1 },
        $pull: { up: createdBy },
      });
    } else {
      await photoModel.findByIdAndUpdate(post_id, {
        $inc: { count: 1 },
        $push: { up: createdBy },
      });
    }
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const down = async (req, res) => {
  try {
    const { post_id, createdBy } = req.body;
    const post = await photoModel.findOne({ _id: post_id, down: createdBy });
    if (post) {
      await photoModel.findByIdAndUpdate(post_id, {
        $inc: { count: 1 },
        $pull: { down: createdBy },
      });
    } else {
      await photoModel.findByIdAndUpdate(post_id, {
        $inc: { count: -1 },
        $push: { down: createdBy },
      });
    }
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPhotos = async (req, res) => {
  try {
    const pageNum = req.query.page ? parseInt(req.query.page) : 1; 
    const pageLim = 5;
    const skip = (pageNum - 1) * pageLim;

    const count = await photoModel.countDocuments();

   
    const photos = await photoModel
      .find({})
      .sort({ count: -1 }) 
      .populate("createdBy up down", "name pic_url")
      .skip(skip)
      .limit(pageLim);

    res.status(200).json({ pages: Math.ceil(count / pageLim), page: pageNum, photos });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = {
  addPhoto,
  up,
  down,
  getPhotos,
};
