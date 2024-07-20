const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const {
  createLog,
  getLogs,
  getLogById,
  updateLog,
  deleteLog,
  getActivityFeed,
  getStatistics
} = require('../controllers/logController');

// Create a log
router.post(
  '/',
  [
    auth,
    [
      check('date', 'Date is required').not().isEmpty(),
      check('patientId', 'Patient ID is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('procedures', 'Procedures are required').not().isEmpty(),
    ]
  ],
  createLog
);

// Get activity feed
router.get('/activity-feed', auth, getActivityFeed);

// Get log statistics
router.get('/statistics', auth, getStatistics);

// Get all logs
router.get('/', auth, getLogs);

// Get log by ID
router.get('/:id', auth, getLogById);

// Update a log
router.put('/:id', auth, updateLog);

// Delete a log
router.delete('/:id', auth, deleteLog);

module.exports = router;
