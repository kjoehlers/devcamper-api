const express = require('express');
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews');

const Review = require('../models/Review');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });
const { authorize, protect } = require('../middleware/auth');

// routes
// /api/v1/bootcamps
// /api/v1/courses
// /api/v1/reviews
// /api/v1/auth
// /api/v1/user

// /api/v1/bootcamps routes
router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(protect, authorize('admin', 'user'), addReview);

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('admin', 'user'), updateReview)
  .delete(protect, authorize('admin', 'user'), deleteReview);

module.exports = router;
