const express = require('express');
const {
  forgotPassword,
  getMe,
  login,
  logout,
  register,
  resetPassword,
  updateDetails,
  updatePassword,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.get('/me', protect, getMe);
router.get('/logout', logout);
router.post('/forgotpassword', forgotPassword);
router.post('/login', login);
router.post('/register', register);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;
