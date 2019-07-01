import Idea from "../database/ideaDatabase";

exports.add = (text, category) => {
    Idea.create({
        text: text,
        category: category
    })
        .then(result => {
            console.log('Created Idea');
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

