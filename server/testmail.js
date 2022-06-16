// 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
// 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


const sgMail = require('@sendgrid/mail')
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'nandhahacker1@gmail.com', // Change to your recipient
  from: process.env.EMAIL, // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })