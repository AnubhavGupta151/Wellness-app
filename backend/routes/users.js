const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/auth');
const { validateUserUpdate } = require('../middleware/validation');

router.use(protect);

router.route('/')
  .get(restrictTo('admin'), getAllUsers);

router.route('/:id')
  .get(getUser)
  .patch(validateUserUpdate, updateUser)
  .delete(restrictTo('admin'), deleteUser);

module.exports = router;