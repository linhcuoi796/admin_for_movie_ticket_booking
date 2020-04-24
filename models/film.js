const mongoose = require('mongoose');

const filmSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    categories: {type: Array, required: true},
    poster: {type: String, required: true},
    trailer: {type: String, required: true},
    premiere_date: {type: Date, required: true},
    status: {type: String, required: true},
    country: {type: String, required: true},
    language: {type: String, required: true},
    director: {type: String, required: true}
});

module.exports = mongoose.model('films', filmSchema);
