const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    user_id: String,
    email: String,
    roll_number: String,
    numbers: [String],
    alphabets: [String],
    highest_lowercase_alphabet: [String],
    is_success: Boolean
});

module.exports = mongoose.model('Response', ResponseSchema);
