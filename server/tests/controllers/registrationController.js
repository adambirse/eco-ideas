const chai = require('chai');
const {stub, resetHistory, assert} = require('sinon');
const proxyquire = require('proxyquire');
const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

const {makeMockModels} = require('sequelize-test-helpers');


describe('Registration Controller', function () {

    let User;
    let Invite;
    let registrationController;
    let fakeUser;
    let fakeInvite;

    beforeEach(function () {
        User = {findOne: stub(), create: stub()};
        Invite = {findOne: stub(), create: stub()};

        const mockModels = makeMockModels({User, Invite});
        const jwt_utils_stub = {
            generateToken: (payload) => {
                return payload
            }
        };
        fakeUser = stub();
        fakeInvite = {update: stub()};

        registrationController = proxyquire('../../src/controllers/RegistrationController', {
            '../models': mockModels,
            '../middleware/jwt': {jwt_utils_stub, '@noCallThru': true}
        });
    });

    after(resetHistory);

    it('User already exists ', async function () {

        const req = {
            body: {
                email_address: 'alreadyexists@test.com',
                password: 'password'
            }
        };

        const status = stub();
        const json = stub();
        status.callsFake(() => {
            status.should.have.been.calledWithMatch(422);
            return res;
        });
        json.callsFake(() => {
            json.should.have.been.calledWithMatch({errors: [{"value": "email_address", "msg": "Invalid email address. User already exists.","param":"email_address","location":"body"}]});
        });

        const res = {status: status, json: json};

        Invite.findOne.resolves(fakeInvite);
        User.findOne.resolves(fakeUser);

        await registrationController.create(req, res);
        User.findOne.should.have.been.called;
        Invite.findOne.should.have.been.called;
        User.create.should.not.have.been.called;

    });

    it('User successfully created ', async () => {

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
            send.should.have.been.calledWithMatch("successfully created an account.");
        });

        const res = {status: status, send: send};

        Invite.findOne.resolves(fakeInvite);
        User.findOne.resolves(undefined);
        User.create.resolves(fakeUser);

        await registrationController.create(req, res);

        Invite.findOne.should.have.been.called;
        User.findOne.should.have.been.called;
        User.create.should.have.been.calledWith(req.body);
    });
});