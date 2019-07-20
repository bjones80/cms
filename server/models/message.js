const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    //_id: {type: String, required: true },
    id: {type: String, required: true},
    subject: {type: String},
    msgText: {type: String},
    sender: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}]
});

module.exports = mongoose.model('Message', messageSchema);