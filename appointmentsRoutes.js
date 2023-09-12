// routes/appointmentsRoutes.js
const express = require('express');
const router = express.Router();
const appointmentsController = require('./appointmentsController');

// POST endpoint to set up an appointment
router.post('/', appointmentsController.setupAppointment);

// GET endpoint to fetch providers
router.get('/', appointmentsController.searchProviders);

// Export the router
module.exports = router;
