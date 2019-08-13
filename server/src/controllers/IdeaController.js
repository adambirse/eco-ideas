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

    let result;
    Idea.findAll().then(ideas => {
        result = ideas;
        return res.json(ideas);
    }).catch(err => {
        console.log(err);
    });
    // res.json(result); -- works for the test but breaks code
};




