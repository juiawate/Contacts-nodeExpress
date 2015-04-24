
var mongoose = require('mongoose');

var ContactModel = mongoose.model('contacts',{
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = ContactModel;
