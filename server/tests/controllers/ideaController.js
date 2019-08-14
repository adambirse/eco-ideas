const chai = require('chai');
const {stub} = require('sinon');
const proxyquire = require('proxyquire');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

const {makeMockModels} = require('sequelize-test-helpers');

describe('Idea Controller', function () {

    let Idea;
    let ideaController;

    const data = [{
        id: 1,
        title: 'Stubbed Title 1',
        text: 'Stubbed text 1'
    },
        {
            id: 2,
            title: 'Stubbed Title 2',
            text: 'Stubbed text 2'
        }];

    beforeEach(function() {
        Idea = {findAll: stub()};
        const mockModels = makeMockModels({Idea});

        ideaController = proxyquire('../../src/controllers/IdeaController', {
            '../models': mockModels
        });
    });

    describe('findAll()', function () {
        it('Success case ', function (done) {

            const json = stub();
            json.callsFake(() => {
                json.should.have.been.calledWithMatch(data);
                done();
            });
                const res = {json: json};



            Idea.findAll.resolves(data);
            
            ideaController.findAll({}, res);

            Idea.findAll.should.have.been.called;
        });


    })
});