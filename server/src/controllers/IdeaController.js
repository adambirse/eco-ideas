const {Idea} = require("../models");

exports.add = (req, res) => {

    Idea.create({
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

exports.findAll =  (req, res) => {
    Idea.findAll().then(ideas => {
        return res.json(ideas);
    }).catch(err => {
        console.log("err");
    });
};




