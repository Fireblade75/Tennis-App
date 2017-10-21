const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Player = require('../model/player').Player;
const ErrorTypes = require('../model/error-types');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const saltRounds = 10;

module.exports = {

    /**
     * Creates a new player entry in the database
     * @param {string} firstName the first name of the user
     * @param {string} lastName the last name of the user
     * @param {number} dssRank the DSS rank of the user (1-9)
     * @returns {Promise.<User, ApiError>}} resolves when the object is stored
     */
    createPlayer: async(function (firstName, lastName, dssRank) {
        return new Promise(function (resolve, reject) {
            try {
                if (dssRank >= 1 && dssRank <= 9) {
                    const player = new Player({ firstName, lastName, dssRank });
                    await(player.save());
                    resolve(player);
                } else {
                    reject(new ErrorType.InvalidRequestError("DSS Rank should be between 1 and 9 (includive)"));
                }
            } catch (err) {
                reject(ErrorTypes.toApiError(err));
            }
        });
    }),

    /**
     * Finds all players
     * @returns {Promise.<[Player], ApiError>}} The players or an ApiError
     */
    getPlayers: async(function () {
        return new Promise(function (resolve, reject) {
            try {
                const players = await(Player.find());
                resolve(players);
            } catch (err) {
                reject(ErrorTypes.toApiError(err));
            }
        });
    }),

    /**
     * Finds a specific player by id
     * @param {ObjectId} id the MongoDB ObjectId of the player
     * @returns {Promise.<[layer, ApiError>}} The players or an ApiError
     */
    getPlayer: async(function (id) {
        return new Promise(function (resolve, reject) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                reject(new ErrorTypes.InvalidRequestError('malformed id'));
                retrun;
            }
            try {
                const player = await(Player.findOne({ '_id': id }));
                resolve(player);
            } catch (err) {
                reject(ErrorTypes.toApiError(err));
            }
        });
    }),
}

