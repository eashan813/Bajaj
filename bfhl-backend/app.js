const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://eashanbatra813:eash1234@cluster0.e26zk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/bfhl', {
  tls: true,  // Enable TLS
  tlsAllowInvalidCertificates: false})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
const bfhlRoutes = require('./routes/bfhl');
app.use('/bfhl', bfhlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
