const Session = require('../models/Session');

// @desc    Get all published sessions
// @route   GET /api/sessions
// @access  Public
const getSessions = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tags, search } = req.query;
    const query = { status: 'published' };

    // Add filters
    if (category) query.category = category;
    if (tags) query.tags = { $in: tags.split(',') };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sessions = await Session.find(query)
      .populate('user_id', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Session.countDocuments(query);

    res.json({
      success: true,
      data: {
        sessions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalSessions: total
        }
      }
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sessions',
      error: error.message
    });
  }
};

// @desc    Get user's sessions
// @route   GET /api/sessions/my-sessions
// @access  Private
const getMySessions = async (req, res) => {
  try {
    const { status } = req.query;
    const query = { user_id: req.user._id };
    
    if (status) query.status = status;

    const sessions = await Session.find(query)
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      data: { sessions }
    });
  } catch (error) {
    console.error('Get my sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching your sessions',
      error: error.message
    });
  }
};

// @desc    Get single session
// @route   GET /api/sessions/my-sessions/:id
// @access  Private
const getSession = async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.user._id
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    res.json({
      success: true,
      data: { session }
    });
  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching session',
      error: error.message
    });
  }
};

// @desc    Save draft session
// @route   POST /api/sessions/my-sessions/save-draft
// @access  Private
const saveDraft = async (req, res) => {
  try {
    const sessionData = {
      ...req.body,
      user_id: req.user._id,
      status: 'draft'
    };

    let session;
    if (req.body._id) {
      // Update existing draft
      session = await Session.findOneAndUpdate(
        { _id: req.body._id, user_id: req.user._id },
        sessionData,
        { new: true, runValidators: true }
      );
    } else {
      // Create new draft
      session = await Session.create(sessionData);
    }

    res.json({
      success: true,
      message: 'Draft saved successfully',
      data: { session }
    });
  } catch (error) {
    console.error('Save draft error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving draft',
      error: error.message
    });
  }
};

// @desc    Publish session
// @route   POST /api/sessions/my-sessions/publish
// @access  Private
const publishSession = async (req, res) => {
  try {
    const sessionData = {
      ...req.body,
      user_id: req.user._id,
      status: 'published'
    };

    let session;
    if (req.body._id) {
      // Update and publish existing session
      session = await Session.findOneAndUpdate(
        { _id: req.body._id, user_id: req.user._id },
        sessionData,
        { new: true, runValidators: true }
      );
    } else {
      // Create and publish new session
      session = await Session.create(sessionData);
    }

    res.json({
      success: true,
      message: 'Session published successfully',
      data: { session }
    });
  } catch (error) {
    console.error('Publish session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error publishing session',
      error: error.message
    });
  }
};

// @desc    Delete session
// @route   DELETE /api/sessions/my-sessions/:id
// @access  Private
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    res.json({
      success: true,
      message: 'Session deleted successfully'
    });
  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting session',
      error: error.message
    });
  }
};

module.exports = {
  getSessions,
  getMySessions,
  getSession,
  saveDraft,
  publishSession,
  deleteSession
};