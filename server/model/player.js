const mongoose = require('mongoose');

// Creates the player Schema
const schema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dssRank: { type: Number, default: 0 }
    }, {
        toObject: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret.__v;
                delete ret._id;
            }
        },
    }
);

/**
 * A virtual method that concatenates the firstName and lastName
 */
schema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

// The MogoDB Player model
const Player = mongoose.model('Player', schema);

module.exports = {
    schema,
    Player
};
