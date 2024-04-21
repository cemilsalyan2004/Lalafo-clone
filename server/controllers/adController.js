const Ad = require('./../models/AdModel');
const AppError = require('./../utils/appError');

exports.addPost = async (req, res, next) => {
  try {
    const files = req.files;
    const poster = files.length > 0 ? files[0].filename : null;
    console.log(req.files[0]);
    const image = files.map((file) => file.filename);
    const { desc, category, city, price, number } = req.body;
    console.log(category);
    const profile = req.user;
    const post = await Ad.create({
      profile,
      poster,
      category,
      desc,
      image,
      number,
      city,
      price,
      created: Date.now(),
      showNumber: true, // change this then
    });
    res.status(200).json({
      status: 'success',
      post,
    });
  } catch (err) {
    return next(new AppError(err));
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const postsPerPage = 28;
    const posts = await Ad.find()
      .skip((page - 1) * postsPerPage)
      .limit(postsPerPage)
      .populate('profile')
      .populate('category')
      .populate('city')
      .sort('-created');

    res.status(200).json({
      status: 'success',
      page: page,
      data: posts,
    });
  } catch (err) {
    return next(new AppError(err));
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Ad.findById(id)
      .populate('profile')
      .populate('category')
      .populate('city');
    if (!post) return next(new AppError('No post found.', 404));
    res.status(200).json({
      status: 'success',
      data: post,
    });
  } catch (err) {
    return next(new AppError(err));
  }
};
