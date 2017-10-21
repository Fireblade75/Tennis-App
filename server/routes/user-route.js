const express = require('express');
const router = express.Router();
const UserManager = require('../controller/user-manager');
const ErrorType = require('../model/error-types');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

router.post('/', async (function (req, res) {
    const { username, password } = req.body;
    let error;
    if (username && password) {
        try {
            let user = await(UserManager.createUser(username, password));
            if (user) {
                res.status(201);
                res.end();
            }
        } catch (err) {
            error = err;
        }
    } else {
        error = new ErrorType.InvalidRequestError();
    }
    if (error) {
        res.status(error.status());
        res.json(error.toJSON());
    }
}));

module.exports = router;