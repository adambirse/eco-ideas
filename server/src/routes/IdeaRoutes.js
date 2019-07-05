const express = require('express');
const ideaController = require('../controllers/IdeaController');
const {check, validationResult} = require('express-validator/check');


const ideaRouter = express.Router();

let validCategories = ['Home', 'Work'];

ideaRouter.post('/api/ideas/', [
    check('text').not().isEmpty().withMessage('Text must not be empty.'),
    check('category').isIn(validCategories).withMessage(`Must be one of these values (${validCategories})`)
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {
        ideaController.add(req, res);
    }
});

// An api endpoint that returns a short list of items
ideaRouter.get('/api/ideas/', (req, res) => {
    ideaController.findAll(req, res);
});

// export default ideaRouter;

module.exports = ideaRouter;