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


    beforeEach(function () {
        User = {findOne: stub(), create: stub()};
        const mockModels = makeMockModels({User});
        const jwt_utils_stub = {
            generateToken: (payload) => {
                return payload
            }
        };
        fakeUser = stub();

        registrationController = proxyquire('../../src/controllers/RegistrationController', {
            '../models': mockModels,
            '../middleware/jwt': {jwt_utils_stub, '@noCallThru': true}
        });
    });

    describe('register()', function () {
        it('User already exists ', function (done) {

            const req = {
                body: {
                    email_address: 'alreadyexists@test.com',
                    password: 'password'
                }
            };

            const status = stub();
            const send = stub();
            status.callsFake(() => {
                status.should.have.been.calledWithMatch(500);
               return res;
            });
            send.callsFake(() => {
                send.should.have.been.calledWithMatch("ERROR");
                done();
            });

            const res = {status: status, send: send};

            User.findOne.resolves(fakeUser);

            registrationController.register(req, res);

            User.findOne.should.have.been.called;
            User.create.should.not.have.been.called;

        });

        it('User successfully created ', function (done) {

            const req = {
                body: {
                    email_address: 'doesnotexists@test.com',
                    password: 'password'
                }
            };

            const status = stub();
            const send = stub();
            status.callsFake(() => {
                status.should.have.been.calledWithMatch(200);
                return res;
            });
            send.callsFake(() => {
                send.should.have.been.calledWithMatch("successfully registered");
                done();
            });

            const res = {status: status, send: send};

            User.findOne.resolves(undefined);
            User.create.resolves(fakeUser);

            registrationController.register(req, res);

            User.findOne.should.have.been.called;
        });
    })
});