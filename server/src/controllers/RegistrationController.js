const {User} = require("../models");
const jwt_util = require("../middleware/jwt");

exports.register = (req, res) => {

    const {email_address, password} = req.body;

    User.findOne({
        where: {email_address: email_address}
    }).then(user => {
        if (user) {
            res.status(500).send("ERROR ");
        } else {
            User.create({
                email_address: email_address,
                password: password
            })
                .then(result => {
                    sres.status(200).send("successfully registered");
                })
                .catch(err => {
                    console.log(err);
                    res.status(200).send("ERROR");
                });
        }
    }).catch(err => {
        res.status(500).send("ERROR ");
    });

};

exports.authenticate = (req, res) => {

    const {email_address, password} = req.body;

    User.findOne({
        where: {email_address: email_address}
    }).then(user => {
        if (user) {
            if (user.validPassword(password)) {

                issueToken(email_address, res);
            } else {
                send401(res);
            }
        } else {
            send401();
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send("ERROR ");

    });
};

function send401(res) {
    res.status(401)
        .json({
            error: 'Incorrect email or password'
        });
}

function issueToken(email_address, res) {
    const payload = {email_address};
    const token = jwt_util.generateToken(payload);
    res.cookie('token', token, {httpOnly: true}).sendStatus(200);
}




