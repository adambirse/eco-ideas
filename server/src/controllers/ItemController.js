import Idea from "../database/ideaDatabase";

exports.add = (req, res) => {


    Idea.create({
        text: req.body.text,
        category: req.body.category
    })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.findAll = (req, res) => {
    Idea.findAll().then(ideas => res.json(ideas)).catch(err => {
        console.log(err);
    });
};

