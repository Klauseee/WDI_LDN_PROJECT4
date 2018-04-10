const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD
  }
});

// const mailOptions = {
//   from: process.env.GMAIL_ADDRESS, // sender address
//   to: 'suii_shum@hotmail.com', // list of receivers
//   subject: 'Application from Nic', // Subject line
//   html: '<p>Test HTML</p>'// plain text body
// };
//
// transporter.sendMail(mailOptions, function (err, info) {
//   if(err) console.log(err);
//   else console.log(info);
// });

module.exports = {
  transporter: transporter
};
