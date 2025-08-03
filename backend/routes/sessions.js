const express = require('express');
const {
  getSessions,
  getMySessions,
  getSession,
  saveDraft,
  publishSession,
  deleteSession
} = require('../controllers/sessionController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getSessions);

// Protected routes
router.get('/my-sessions', auth, getMySessions);
router.get('/my-sessions/:id', auth, getSession);
router.post('/my-sessions/save-draft', auth, saveDraft);
router.post('/my-sessions/publish', auth, publishSession);
router.delete('/my-sessions/:id', auth, deleteSession);

module.exports = router;