const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
} = require('sequelize-test-helpers');

const IdeaModel = require('../../src/models/idea');

describe('Idea model', () => {
    const Idea = IdeaModel(sequelize, dataTypes);
    const idea = new Idea();

    checkModelName(Idea)('Idea');

    context('properties', () => {
        ['id', 'title', 'text'].forEach(
            checkPropertyExists(idea)
        )
    })

});