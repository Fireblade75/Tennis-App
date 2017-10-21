const mongoose = require('mongoose');

// Creates the match Schema
const schema = new mongoose.Schema(
    {
        homePlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
        outPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
        homeScore: { type: Number, required: true },
        outScore: { type: Number, required: true }
    },
    {
        toObject: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret.__v;
                delete ret._id;
            }
        },
    }
);

// The MogoDB Match model
const Match = mongoose.model('Match', schema);

module.exports = {
    schema,
    Match
};
