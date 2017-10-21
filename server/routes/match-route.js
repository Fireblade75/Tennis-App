const express = require('express');
const router = express.Router();
const MatchManager = require('../controller/match-manager');
const ErrorType = require('../model/error-types');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

router.post('/', async(function (req, res) {
    let error;
    if (req.currentUser !== undefined) {
        const { homePlayer, outPlayer, homeScore, outScore } = req.body;
        if (homePlayer && outPlayer && (homeScore || homeScore === 0) && (outScore || outScore === 0)) {
            try {
                const match = await(MatchManager.createMatch(homePlayer, outPlayer, homeScore, outScore));
                if (match) {
                    res.status(201);
                    res.end();
                }
            } catch (err) {
                error = err;
            }
        } else {
            console.log(req.body);
            error = new ErrorType.InvalidRequestError();
        }
    } else {
        error = new ErrorType.UnauthorizedError();
    }
    if (error) {
        console.log(error);
        res.status(error.status());
        res.json(error.toJSON());
    }
}));

router.get('/', async(function (req, res) {
    try {
        const matches = await(MatchManager.getMatches());
        res.status(200);
        res.json(matches.map((match) => match.toObject()));
    } catch (error) {
        res.status(error.status());
        res.json(error.toJSON());
    }
}));

module.exports = router;