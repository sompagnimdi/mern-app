const mongoose = require('mongoose');

require('./category');

const itemSchema = require('./itemSchema')

module.exports = mongoose.model('Item', itemSchema);
