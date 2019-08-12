const db = require("../models");

exports.add = (req, res) => {

    db.idea.create({
        title: req.body.title,
        text: req.body.text
    })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.findAll = (req, res) => {
    db.idea.findAll().then(ideas => {
        res.json(ideas);
    }).catch(err => {
        console.log(err);
    });
};


