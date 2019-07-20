const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    //_id: {type: String, required: true },
    id: {type: String, required: true},
    name: {type: String},
    description: {type: String}, 
    url: {type: String}
});

module.exports = mongoose.model('Documents', documentSchema);