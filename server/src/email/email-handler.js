const transport = require('../email/smtp');

const registration_endpoint = process.env.REGISTRATION_ENDPOINT || 'http://localhost:3000/create-account';
const sender_email = process.env.SENDER_EMAIL || 'eco-ideas.com';
const valid_admin_email_address = process.env.VALID_ADMIN_EMAIL_ADDRESS || 'admin@eco-ideas.com';

exports.sendEmail =  async (email_address,uuid) => {

const registration_url = `${registration_endpoint}/${uuid}`;
    const body = `
    <h1>Please create an account</h1>
    <p>Click <a href="${registration_url}">here<a/> to create your account and finish the registration process</p>
`;

    const message = {
        from: sender_email,
        to: email_address,
        subject: 'Please create an account',
        html: body
    };

    await transport.sendMail(message);
};

exports.checkEmail= (email_address) => {
    return (email_address === valid_admin_email_address);
};