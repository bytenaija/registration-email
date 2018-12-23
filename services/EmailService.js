const Email = require('email-templates');
const path = require('path'),
nodemailer = require('nodemailer');


let transport = nodemailer.createTransport({
host: 'smtp.gmail.com',
port: 465,
secure: true, // true for 465, false for other ports
auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD 
}
})

exports.email = (emailAddress, link) =>{

    console.log(__dirname)
const templateDir = path.join(__dirname, 'Emails')
 
const emailService = new Email({
views: { root: templateDir },
  message: {
    from: ''
  },
  // uncomment below to send emails in development/test env:
  // send: true
send: true,
transport: transport,

});
 
emailService
  .send({
    template: 'AccountActivation',
    message: {
      to: emailAddress
    },
    locals: {
      link
    }
  })
  .then(console.log)
  .catch(console.error);

}