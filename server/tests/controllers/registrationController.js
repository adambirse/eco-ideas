const chai = require('chai');
const {stub} = require('sinon');
const proxyquire = require('proxyquire');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

const {makeMockModels} = require('sequelize-test-helpers');


describe('Registration Controller', function () {

    let User;
    let registrationController;
    let fakeUser;
    let req;
    let status, send;

    beforeEach(function () {
        User = {findOne: stub(), create: stub()};
        const mockModels = makeMockModels({User});
        const jwt_utils_stub = {
            generateToken: (payload) => {
                return payload
            }
        };
        fakeUser = stub();
        req = {
            body: {
                email_address: 'alreadyexists@test.com',
                password: 'password'
            }
        };
        status = stub();
        send = stub();

        registrationController = proxyquire('../../src/controllers/RegistrationController', {
            '../models': mockModels,
            '../middleware/jwt': {jwt_utils_stub, '@noCallThru': true}
        });
    });

        it('register() - User already exists ', function (done) {

            status.callsFake(() => {
                status.should.have.been.calledWithMatch(500);
                return res;
            });
            send.callsFake(() => {
                send.should.have.been.calledWithMatch("ERROR");

            });

            User.findOne.resolves(fakeUser);

            registrationController.register(req, {status: status, send: send});

            done();

        });

    it('register() User successfully created ', function (done) {

        status.callsFake(() => {
            status.should.have.been.calledWithMatch(200);
            return res;
        });
        send.callsFake(() => {
            send.should.have.been.calledWithMatch("successfully registered");

        });

        User.findOne.returns(undefined);
        User.create.returns(fakeUser);

        registrationController.register(req, {status: status, send: send});
        done();

    });
});