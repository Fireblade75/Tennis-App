const express = require('express');
const router = express.Router();
const UserManager = require('../controller/user-manager');
const jwt = require('jsonwebtoken');
const ErrorType = require('../model/error-types');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

// Authenticate the user
router.post('/', async (function (req, res) {
    const { username, password } = req.body;

    let error;
    if (username && password) {
        try {
            let succes = await(UserManager.verifyPassword(username, password));
            if(succes) {
                let token = jwt.sign({username}, req.app.get('private-key'), {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.header('authorization', token);
                res.status(204);
                res.end();
            } else {
                error = new ErrorType.UnauthorizedError();
            }
        } catch(err) {
            error = err;
        }
    } else {
        error = new ErrorType.InvalidRequestError();
    }
    if(error) {
        error = ErrorType.toApiError(error);
        res.status(error.status());
        res.json(error.toJSON());
    }
    
}));

module.exports = router;