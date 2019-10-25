const chai = require('chai');
const {stub} = require('sinon');
const proxyquire = require('proxyquire');
const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

describe('Email Handler', function () {

    let emailHandler;
    let send = stub();

    beforeEach(function () {

        emailHandler = proxyquire('../../src/email/email-handler', {
            '@sendgrid/mail': {
                send: send,
                setApiKey: stub(), '@noCallThru': true
            }
        });
    });

    it('Verify email invalid ', () => {
        const result = emailHandler.checkEmail("invalid@test.com");
        result.should.equal(false);
    });

    it('Verify email valid ', () => {
        const result = emailHandler.checkEmail("admin@eco-ideas.com");
        result.should.equal(true);
    });

    it('email success', async function () {
        send.resolves("success");
        const result = await emailHandler.sendEmail("test@email.com", 'uuid');
        result.should.equal(true);
        send.should.have.been.called;
    });

    it('email failure', async function () {
        await send.rejects("exception");
        const result = await emailHandler.sendEmail("test@email.com", 'uuid');
        result.should.equal(false);
        send.should.have.been.called;
    });

});