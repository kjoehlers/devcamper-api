const express = require('express');
const {
  forgotPassword,
  getMe,
  login,
  register,
  resetPassword,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.post('/login', login);
router.post('/register', register);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
