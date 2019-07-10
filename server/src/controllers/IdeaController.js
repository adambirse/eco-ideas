import Idea from "../database/ideaDatabase";

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

exports.findAll = (req, res) => {
    Idea.findAll().then(ideas => res.json(ideas)).catch(err => {
        console.log(err);
    });
};

