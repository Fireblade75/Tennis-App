const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../model/user').User;
const ErrorTypes = require('../model/error-types');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const saltRounds = 10;

module.exports = {

    /**
     * Creates a password entry for a user
     * @param {string} username the username of the user
     * @param {string} password the password of the user
     * @returns {Promise.<User, ApiError>}} resolves when the object is stored
     */
    createUser: async(function (username, password) {
        return new Promise(function (resolve, reject) {
            try {
                const existingUser = await(User.findOne({ 'username': username }));
                if (!existingUser) {
                    bcrypt.hash(password, saltRounds, function (err, hash) {
                        let user = new User({
                            'username': username,
                            'hash': hash
                        });
                        user.save().then(function (result) {
                            resolve(result);
                        }).catch(function (err) {
                            reject(ErrorTypes.toApiError(err));
                        });
                    });
                } else {
                    reject(new ErrorTypes.ResourceExistsError('username already exists'));
                }
            } catch (err) {
                reject(ErrorTypes.toApiError(err));
            }
        });
    }),

    /**
     * Verifies a password entry for a user
     * @param username the username of the user
     * @param password the password of the user
     * @returns {Promise.<boolean, ApiError>} resolves when the object is stored
     */
    verifyPassword: async(function (username, password) {
        return new Promise(function (resolve, reject) {
            try {
                const user = await(User.findOne({ 'username': username }));
                if (user) {
                    bcrypt.compare(password, user.hash, function (err, res) {
                        if (err) {
                            reject(ErrorTypes.toApiError(err));
                        } else {
                            resolve(Boolean(res));
                        }
                    });
                } else {
                    reject(new ErrorTypes.UnauthorizedError());
                }
            } catch (err) {
                reject(ErrorTypes.toApiError(err));
            }
        });
    })
}

