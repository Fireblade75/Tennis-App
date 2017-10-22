const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Match = require('../model/match').Match;
const PlayerManager = require('./player-manager');
const ErrorTypes = require('../model/error-types');
const moment = require('moment');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const saltRounds = 10;

module.exports = {

    /**
     * Creates a new match entry in the database
     * @param {ObjectId} homePlayer the home player
     * @param {ObjectId} outPlayer the out player
     * @param {number} homeScore the score of the home player
     * @param {number} outScore the score of the home player
     * @param {string} matchDate the date of the match
     * @returns {Promise.<User, ApiError>}} resolves when the object is stored
     */
    createMatch: async(function (homePlayer, outPlayer, homeScore, outScore, matchDateStr) {
        return new Promise(function (resolve, reject) {
            // Check if the scores are valid
            if (typeof(homeScore) != 'number' || typeof(outScore) != 'number') {
                reject(new ErrorTypes.InvalidRequestError("Invalid score id"));
                return;
            }
            homeScore = Math.floor(Number(homeScore));
            outScore = Math.floor(Number(outScore));
            if (homeScore < 0 || outScore < 0) {
                reject(new ErrorTypes.InvalidRequestError("Invalid score"));
                return;
            }

            // Check if the match date is valid
            const matchMoment = moment(matchDateStr, "YYYY-MM-DD", true);
            if (!matchMoment.isValid()) {
                reject(new ErrorTypes.InvalidRequestError("game date should have format yyyy-mm-dd"));
                return;
            } else if (matchMoment.isAfter(new Date())) {
                reject(new ErrorTypes.InvalidRequestError("game date can not be in the future"));
                return;
            }
            const matchDate = matchMoment.toDate();
 
            // Check if the players exist
            if (!mongoose.Types.ObjectId.isValid(homePlayer) || !mongoose.Types.ObjectId.isValid(outPlayer)) {
                reject(new ErrorTypes.InvalidRequestError("Invalid player id"));
                return;
            }
            try {
                let homePlayerObject = await(PlayerManager.getPlayer(homePlayer));
                let outPlayerObject = await(PlayerManager.getPlayer(outPlayer));
                if(!homePlayerObject) {
                    reject(new ErrorTypes.InvalidRequestError("Home player does not exist"));
                    return;
                }
                if(!outPlayer) {
                    reject(new ErrorTypes.InvalidRequestError("Out player does not exist"));
                    return;
                }

                // Create the new match
                const match  = new Match({homePlayer, outPlayer, homeScore, outScore, matchDate });
                await(match.save());
                resolve(match);
            } catch (err) {
                reject(ErrorTypes.toApiError(err));
            }
        });
    }),

    /**
     * Finds all matches
     * @returns {Promise.<[Match], ApiError>}} The matches or an ApiError
     */
    getMatches: async(function () {
        return new Promise(function (resolve, reject) {
            try {
                const matches = await(
                    Match.find().populate('homePlayer').populate('outPlayer')
                );
                resolve(matches);
            } catch (err) {
                reject(ErrorTypes.toApiError(err));
            }
        });
    }),
}

