const {User, Invite} = require("../models");
const jwt_util = require("../middleware/jwt");
const {checkEmail, sendEmail} = require("../email/email-handler");
const uuidv4 = require('uuid/v4');

exports.register = async (req, res) => {

    const {email_address} = req.body;
    try {
        if (checkEmail(email_address)) {
            const uuid = uuidv4();
            const invite = await Invite.create({
                email_address: email_address,
                invite_hash: uuid,
                status: 'created'
            });
            await sendEmail(email_address, uuid);
            await invite.update({status: 'sent'});
            res.status(200).send("successfully registered.");
        } else {
            //Send error in format of validationErrors
            res.status(422).json({errors: [{"value": "email_address", "msg": "Invalid email address. Please choose a valid one.","param":"email_address","location":"body"}]});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error.");
    }
};

const validateHash = async (email_address, invite_hash) => {
    return Invite.findOne({
        where: {
            email_address: email_address,
            invite_hash: invite_hash
        }
    });
};

exports.create = async (req, res) => {

    const {email_address, password, invite_hash} = req.body;
    try {
        const invite = await validateHash(email_address, invite_hash);
        if (invite) {
            const existingUser = await User.findOne({
                where: {email_address: email_address}
            });
            if (existingUser) {
                res.status(422).json({errors: [{"value": "email_address", "msg": "Invalid email address. User already exists.","param":"email_address","location":"body"}]});
            } else {
                const newUser = await User.create({
                    email_address: email_address,
                    password: password
                });
                if (newUser) {
                    res.status(200).send("successfully created an account.");
                }
            }
        } else {
            res.status(422).json({errors: [{"value": "invite_hash", "msg": "Invalid invite.","param":"invite_hash","location":"body"}]});

        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
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