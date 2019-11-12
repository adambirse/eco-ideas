const {Idea} = require('../models');

exports.add = async(req, res) => {

  try {
    const idea = await Idea.create({
      title: req.body.title,
      text: req.body.text,
    });
    res.json(idea);
  } catch (err) {
    console.log(err);
  }
};

exports.findAll = async(req, res) => {
  try {
    const ideas = await Idea.findAll();
    return res.json(ideas);
  } catch (err) {
    console.log(err);
  }
};


