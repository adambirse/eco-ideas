const jwt_util = require("../middleware/jwt");

const withAuth = function (req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt_util.verify(token, res, next);
    }
};

module.exports = withAuth;