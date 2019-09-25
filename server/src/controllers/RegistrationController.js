const {User} = require("../models");
const jwt_util = require("../middleware/jwt");

exports.register = async (req, res) => {

    const {email_address, password} = req.body;
    try {
        const existingUser = await User.findOne({
            where: {email_address: email_address}
        });
        if (existingUser) {
            res.status(500).send("ERROR");
        } else {
            const newUser = await User.create({
                email_address: email_address,
                password: password
            });
            if (newUser) {
                res.status(200).send("successfully registered.");
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("ERROR");
    }
};

exports.authenticate = async (req, res) => {

    const {email_address, password} = req.body;

    try {
        const user = await User.findOne({
            where: {email_address: email_address}
        });
        if (user) {
            if (user.validPassword(password)) {
                issueToken(email_address, res);
            } else {
                send401(res);
            }
        } else {
            send401(res);
        }
    } catch (err) {
        send401(res);
    }
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
    res.cookie('token', token, {httpOnly: true});
    res.cookie('role', 'admin').sendStatus(200);
}




