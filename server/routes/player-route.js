const express = require('express');
const router = express.Router();
const PlayerManager = require('../controller/player-manager');
const ErrorType = require('../model/error-types');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

router.post('/', async(function (req, res) {
    let error;
    if (req.currentUser !== undefined) {
        const { firstName, lastName, dssRank } = req.body;
        if (firstName && lastName && dssRank) {
            try {
                const player = await(PlayerManager.createPlayer(firstName, lastName, dssRank));
                if (player) {
                    res.status(201);
                    res.end();
                }
            } catch (err) {
                error = err;
            }
        } else {
            error = new ErrorType.InvalidRequestError();
        }
    } else {
        error = new ErrorType.UnauthorizedError();
    }
    if (error) {
        res.status(error.status());
        res.json(error.toJSON());
    }
}));

router.get('/', async(function (req, res) {
    try {
        const players = await(PlayerManager.getPlayers());
        res.status(200);
        res.json(players.map((player) => player.toObject()));
    } catch (error) {
        res.status(error.status());
        res.json(error.toJSON());
    }
}));

router.get('/:id', async(function (req, res) {
    try {
        const player = await(PlayerManager.getPlayer(req.params.id));
        if (player) {
            res.status(200);
            res.json(player.toObject());
        } else {
            res.status(404);
            res.end();
        }
    } catch (error) {
        res.status(error.status());
        res.json(error.toJSON());
    }
}));


module.exports = router;