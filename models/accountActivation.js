const mongoose = require('mongoose');


const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },

    code: {
        type: 'String',
        required: true
    },

})



module.exports = mongoose.model('AccountActivation', accountSchema);