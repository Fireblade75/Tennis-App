const mongoose = require('mongoose');

// Creates the user Schema
const schema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        hash: { type: String, required: true },
    },
    {
        toObject: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret.__v;
                delete ret._id;
                delete ret.hash;
            }
        },
    }
);

// The MogoDB User model
const User = mongoose.model('User', schema);

module.exports = {
    schema,
    User
};
