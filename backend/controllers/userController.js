const User = require('../models/User');
const AppError = require('../utils/AppError');
const { createSendToken } = require('../config/jwt');
const { filterObj } = require('../utils/helpers');

// Register new user
exports.register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    
    // 1) Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('User already exists with this email', 400));
    }

    // 2) Create user
    const newUser = await User.create({
      email,
      password, // Will be hashed by pre-save middleware
      name
    });

    // 3) Generate token and send response
    createSendToken(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) Check if account is active
    if (!user.isActive) {
      return next(new AppError('Account is deactivated', 401));
    }

    // 4) Send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// Get current user
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
};

// Update user (name, email)
exports.updateMe = async (req, res, next) => {
  try {
    // 1) Filter unwanted fields
    const filteredBody = filterObj(req.body, 'name', 'email');
    
    // 2) Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (err) {
    next(err);
  }
};

// Deactivate account (set isActive=false)
exports.deactivateMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { isActive: false });
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};

// Admin: Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    next(err);
  }
};

// Admin: Delete user ..

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};