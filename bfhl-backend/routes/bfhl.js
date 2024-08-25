const express = require('express');
const router = express.Router();
const Response = require('../models/Response');

// POST request to process data and store in MongoDB
router.post('/', async (req, res) => {
    const { data } = req.body;
    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = [];

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                highestLowercaseAlphabet.push(item);
            }
        }
    });

    highestLowercaseAlphabet.sort().reverse();

    const newResponse = new Response({
        user_id: "john_doe_17091999", // Replace with dynamic logic
        email: "john@xyz.com",        // Replace with dynamic logic
        roll_number: "ABCD123",       // Replace with dynamic logic
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet.slice(0, 1),
        is_success: true
    });

    try {
        const savedResponse = await newResponse.save();
        res.json(savedResponse);
    } catch (err) {
        res.status(400).json({ is_success: false, message: err.message });
    }
});

// GET request to return operation_code
router.get('/', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

module.exports = router;
