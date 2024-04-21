const Category = require('./../models/CategoryModel');
const City = require('./../models/CityModel');
const AppError = require('./../utils/appError');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories) return next(new AppError('No category found.', 404));
    res.status(200).json({
      status: 'success',
      categories,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getCities = async (req, res, next) => {
  try {
    console.log('got this 👍🏻');
    const cities = await City.find();
    if (!cities) return next(new AppError('No city found.', 404));
    res.status(200).json({
      status: 'success',
      cities,
    });
  } catch (err) {
    return next(err);
  }
};
