const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require('../controllers/bootcamps');

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

// routes
// /api/v1/bootcamps
// /api/v1/courses
// /api/v1/reviews
// /api/v1/auth
// /api/v1/user

// /api/v1/bootcamps routes
router.route('/').get(getBootcamps).post(createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
