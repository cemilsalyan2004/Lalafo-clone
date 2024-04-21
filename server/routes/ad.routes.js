const express = require('express');
const upload = require('./../utils/upload');
const adController = require('./../controllers/adController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Routes
router
  .route('/addPost')
  .post(
    upload.array('image', 30),
    authController.protect,
    adController.addPost
  );
router.route('/getPosts').get(adController.getPosts);
router.route('/getPostById/:id').get(adController.getPostById)

module.exports = router;
