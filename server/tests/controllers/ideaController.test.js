const chai = require('chai');
const {match, stub, resetHistory, spy} = require('sinon');
const proxyquire = require('proxyquire');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

const {makeMockModels} = require('sequelize-test-helpers');

describe('Idea Controller', function () {

    const data = {
        id: 1,
        title: 'Stubbed Title',
        text: 'Stubbed text'
    };

    describe('findAll()', function () {
        it('Success case ', function () {

            const mockResponse = () => {
                const res = {};
                res.json = stub().returns(res);
                return res;
            };

            const res = mockResponse();

            const Idea = {findAll: stub()};
            const mockModels = makeMockModels({Idea});

            const ideaController = proxyquire('../../src/controllers/IdeaController', {
                '../models': mockModels
            });

            Idea.findAll.resolves(data);
            
            let actual = ideaController.findAll({}, res);

            Idea.findAll.should.have.been.called; // passes
            res.json.should.have.been.called; //fails
        });
    })
});