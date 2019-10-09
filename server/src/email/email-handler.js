const transport = require('../email/smtp');


exports.sendEmail =  async (email_address,uuid) => {

const registration_url = `http://localhost:3000/create-account/${uuid}`;
    const body = `
    <h1>Please create an account</h1>
    <p>Click <a href="${registration_url}">here<a/> to create your account and finish the registration process</p>
`;

    const message = {
        from: 'eco-ideas.com',
        to: email_address,
        subject: 'Please create an account',
        html: body
    };

    await transport.sendMail(message);
};

exports.checkEmail= (email_address) => {
    //TODO more sophisticated
    return (email_address === 'adambirse@gmail.com');
};