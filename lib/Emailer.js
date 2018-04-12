const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const Promise = require('bluebird');

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD
  }
}));

function sendMail(mailOptions) {
  Object.assign(mailOptions, { from: process.env.GMAIL_ADDRESS });

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(err, info) {
      if(err) return reject(err);
      resolve(info);
    });
  });
}

module.exports = {
  sendMail
};
