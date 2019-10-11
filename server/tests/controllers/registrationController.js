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
    let jwt_utils = {
        generateToken: stub(),
        verify: stub(),
        '@noCallThru': true,
    };
    const email_handler_stub = {
        sendEmail: stub(),
        checkEmail: stub()
    };

    User = {findOne: stub(), create: stub()};
    Invite = {findOne: stub(), create: stub()};

    const mockModels = makeMockModels({User, Invite});
    fakeUser = {validPassword: stub()};

    fakeUser = {validPassword: stub()};
    fakeInvite = {update: stub()};

    beforeEach(function () {

        registrationController = proxyquire('../../src/controllers/registrationController', {
            '../models': mockModels,
            '../middleware/jwt': jwt_utils,
            '../email/email-handler': email_handler_stub
        });
    });

    afterEach(resetHistory);

    it('User already exists ', async function () {

        const req = createRequest('alreadyexists@test.com');

        const status = stub();
        const json = stub();
        status.callsFake(() => {
            status.should.have.been.calledWithMatch(422);
            return res;
        });
        json.callsFake(() => {
            json.should.have.been.calledWithMatch({
                errors: [{
                    "value": "email_address",
                    "msg": "Invalid email address. User already exists.",
                    "param": "email_address",
                    "location": "body"
                }]
            });
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

        const req = createRequest('doesnotexist@test.com');

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

    it('Register Invalid email', async () => {

        const req = createRequest('invalid-email@test.com');

        const status = stub();
        const json = stub();
        status.callsFake(() => {
            status.should.have.been.calledWithMatch(422);
            return res;
        });
        json.callsFake(() => {
            json.should.have.been.calledWithMatch({
                errors: [{
                    "value": "email_address",
                    "msg": "Invalid email address. Please choose a valid one.",
                    "param": "email_address",
                    "location": "body"
                }]
            });
        });

        const res = {status: status, json: json};
        await registrationController.register(req, res);
    });

    it('Register valid email', async () => {

        const req = createRequest('admin@eco-ideas.com');

        const status = stub();
        const send = stub();
        status.callsFake(() => {
            status.should.have.been.calledWithMatch(200);
            return res;
        });
        send.callsFake(() => {
            send.should.have.been.calledWithMatch("successfully registered.");
        });

        email_handler_stub.checkEmail.returns(true);
        Invite.create.resolves(fakeInvite);

        const res = {status: status, send: send};
        await registrationController.register(req, res);

        email_handler_stub.sendEmail.should.have.been.called;
        Invite.create.should.have.been.called;
        fakeInvite.update.should.have.been.called;

    });

    it('Authenticate - user does not exist', async () => {

        const req = createRequest('admin@eco-ideas.com');

        const status = stub();
        const json = stub();
        status.callsFake(() => {
            status.should.have.been.calledWithMatch(401);
            return res;
        });
        json.callsFake(() => {
            json.should.have.been.calledWithMatch({
                error: 'Incorrect email or password'
            });
        });

        User.findOne.resolves(undefined);

        const res = {status: status, json: json};
        await registrationController.authenticate(req, res);

        User.findOne.should.have.been.called;

    });

    it('Authenticate -incorrect password', async () => {

        const req = createRequest('test@eco-ideas.com');

        const status = stub();
        const json = stub();
        status.callsFake(() => {
            status.should.have.been.calledWithMatch(401);
            return res;
        });
        json.callsFake(() => {
            json.should.have.been.calledWithMatch({
                error: 'Incorrect email or password'
            });
        });

        User.findOne.resolves(fakeUser);
        fakeUser.validPassword.returns(false);

        const res = {status: status, json: json};
        await registrationController.authenticate(req, res);

        User.findOne.should.have.been.called;

    });

    it('Authenticate - success', async () => {

        const req = createRequest('test@eco-ideas.com');

        const cookie = stub();
        const sendStatus = stub();
        sendStatus.callsFake(() => {
            sendStatus.should.have.been.calledWithMatch(200);
            return res;
        });
        cookie.callsFake(() => {
            cookie.should.have.been.calledWithMatch('token', 'token', {httpOnly: true});
            return res;
        });


        User.findOne.resolves(fakeUser);
        fakeUser.validPassword.returns(true);
        const payload = {email_address: 'test@eco-ideas.com'};
        jwt_utils.generateToken.returns('token');

        const res = {sendStatus: sendStatus, cookie: cookie};
        await registrationController.authenticate(req, res);

        User.findOne.should.have.been.called;

    });

});

const createRequest = (email) => {
    return {
        body: {
            email_address: email,
            password: 'password'
        }
    };
};