const jwt = require('jsonwebtoken');

//TODO sercrets properly
const secret = 'mysecretsshhh';

exports.generateToken = (payload) => {
    return  jwt.sign(payload, secret, {
        expiresIn: '1h' //TODO is this right, inspect cookies and the expiry date looks a lot longer.
    });
};

exports.verify = (token, res, next) => {
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            res.status(401).send('Unauthorized: Invalid token');
        } else {
            // req.email = decoded.email;
            next();
        }
    });
};
