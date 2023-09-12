const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Import the appointmentsRoutes
const appointmentsRoutes = require('./appointmentsRoutes');

// Use the appointmentsRoutes
app.use('/appointments', appointmentsRoutes);

// Mock data source (you can replace this with a real data source)
const providersData = require('./providers/providers.json');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
