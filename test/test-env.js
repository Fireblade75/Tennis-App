process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const { app, server } = require('../server/index');
const User = require('../server/model/user').User;
const Player = require('../server/model/player').Player;
const Match = require('../server/model/match').Match;
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const clearDb = async((callback) => {
    await([
        User.remove({}),
        Player.remove({}),
        Match.remove({})
    ]);
});

before(function (done) {
    mongoose.connection.once('open', function () {
        done();
    });
});

after(function () {
    server.close();
});

module.exports = {
    prepare: clearDb
}