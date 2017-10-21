process.env.NODE_ENV = 'test';
const request = require('supertest');
const should = require('should');
const app = require('../server/index').app;
const prepareTest = require('./test-env').prepare;
const async = require('asyncawait/async');
const await = require('asyncawait/await');

let token, players;
const userData = require('./sample-data/users');
const playerData = require('./sample-data/players');
const rootUser = { "username": "admin", "password": "bokito"};

function createUser(user) {
    return new Promise(function(resolve, reject) {
        request(app)
            .post('/api/users')
            .send(user)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    res.status.should.equal(201);
                    resolve(res);
                }
            });
    });
}

function getToken(user) {
    return new Promise(function(resolve, reject) {
        request(app)
            .post('/auth')
            .send(user)
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    res.status.should.equal(204);
                    resolve(res.header.authorization);
                }
            });
    });
}

function createPlayer(player, token) {
    return new Promise(function(resolve, reject) {
        request(app)
            .post('/api/players')
            .send(player)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
            .end(function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    res.status.should.equal(201);
                    resolve(res);
                }
            });
    });
}

function createMatch(match, token) {
    return new Promise(function(resolve, reject) {
        request(app)
            .post('/api/matches')
            .send(match)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
            .end(function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    res.status.should.equal(201);
                    resolve(res);
                }
            });
    });
}

function getPlayers() {
    return new Promise(function(resolve, reject) {
        request(app)
            .get('/api/players')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    res.status.should.equal(200);
                    resolve(res.body);
                }
            });
    });
}

describe("Create data", function () {
    before(async(function(){
        await(prepareTest());
        await(createUser(rootUser));
        token = await(getToken(rootUser));
    }));

    it('Create users', function () {
        return new Promise((resolve, reject) => {
            const userPromises = userData.map((data) => {
                return createUser(data);
            });
            Promise.all(userPromises).then((result) => {
                resolve();
            }).catch((err) => {
                reject(err);
            })
        });
    });

    it('Create players', function () {
        return new Promise(function(resolve, reject) {
            const playerPromises = playerData.map((data) => {
                return createPlayer(data, token);
            });
            Promise.all(playerPromises).then((result) => {
                resolve();
            }).catch((err) => {
                reject(err);
            })
        });
    });

    it('Create matches', async(function () {
        return new Promise(function(resolve, reject) {
            const players = await(getPlayers());
            if(players.length < 2) {
                reject(new Error('requires more then two players'));
                return;
            }
            players.reduce(function(homePlayer, outPlayer) {
                let [homeScore, outScore] = [Math.floor(Math.random()*7), Math.floor(Math.random()*7)];
                if (homeScore == outScore) homeScore++;
                const match = {
                    homePlayer: homePlayer.id,
                    outPlayer: outPlayer.id,
                    homeScore,
                    outScore
                };
                let result = await(createMatch(match, token));
                return outPlayer;
            });
            resolve();
        });
    }));
})