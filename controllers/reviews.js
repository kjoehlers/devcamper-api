const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');

// @desc: Get reviews
// @route: GET /api/v1/reviews
// @route: GET /api/v1/bootcamps/:bootcampid/reviews
// @access: Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc: Get review
// @route: GET /api/v1/reviews/:id
// @route: GET /api/v1/bootcamps/:bootcampid/reviews
// @access: Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with ID of ${req.params.id}...`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc: Add review
// @route: POST /api/v1/bootcamps/:bootcampid/reviews/
// @access: Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.body.bootcamp);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No Bootcamp found with ID of ${req.body.bootcamp}`,
        404
      )
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});

// @desc: Update review
// @route: POST /api/v1/reviews/:id
// @access: Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  if (!review) {
    return next(
      new ErrorResponse(`No Review found with ID of ${req.params.id}`, 404)
    );
  }

  // Make sure user is review owner or admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User with ID of ${req.user.id} is not authorized to update this review...`,
        401
      )
    );
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc: Delete review
// @route: DELETE /api/v1/reviews/:id
// @access: Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(
      new ErrorResponse(`No Review found with ID of ${req.params.id}`, 404)
    );
  }

  // Make sure user is review owner or admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User with ID of ${req.user.id} is not authorized to update this review...`,
        401
      )
    );
  }

  await Review.Remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
