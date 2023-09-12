// controllers/appointmentsController.js
const providersData = require('./providers/providers.json');

// Helper function to check availability
function checkAvailability(name, date) {
  const provider = providersData.find((provider) => provider.name === name);

  if (!provider) {
    return false;
  }

  return provider.available.includes(new Date(date).toISOString());
}

// Controller for setting up an appointment
function setupAppointment(req, res) {
  const { name, date } = req.body;

  // Check if an availability exists
  const availabilityExists = checkAvailability(name, date);

  if (!availabilityExists) {
    return res.status(400).json({ error: 'Availability does not exist' });
  }

  // If availability exists, return success
  res.status(200).json({ message: 'Appointment set up successfully' });
}

// Controller for searching providers
function searchProviders(req, res) {
  const { specialty, date, minScore } = req.query;

  // Validate query parameters
  if (!specialty || isNaN(Date.parse(date)) || isNaN(parseFloat(minScore))) {
    return res.status(400).json({ error: 'Bad request. Check your parameters.' });
  }

  // Filter providers based on criteria
  const filteredProviders = providersData.filter((provider) => {
    return (
      provider.specialty.toLowerCase() === specialty.toLowerCase() &&
      provider.available.includes(new Date(date).toISOString()) &&
      provider.score >= parseFloat(minScore)
    );
  });

  // Sort providers by score from highest to lowest
  filteredProviders.sort((a, b) => b.score - a.score);

  // Extract provider names
  const providerNames = filteredProviders.map((provider) => provider.name);

  res.status(200).json(providerNames);
}

// Export the controller functions
module.exports = {
  setupAppointment,
  searchProviders,
};
