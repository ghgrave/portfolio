const nodemailer = require('nodemailer');

const data = {
    date: '10/20/2018',
    event_title: 'Halloween Party',
    event_desc: 'Throwing a party for Ginger!',
    contact_name: 'JM',
    contact_info_option: 'Phone',
    contact_info: '(111)111-1234',
    sub_contact_name: 'Jon-Mikel',
    sub_contact_info_option: 'Email',
    sub_contact_info: 'ghgrave@yahoo.com',
    approved: true 
};
let key = Object.keys(data);
console.log(key);
console.log(data.date);
let htmlText ='';
key.forEach((eventKey) => {
    console.log(data[eventKey]);
    htmlText = htmlText + `<p>${eventKey}: ${data[eventKey]}</p>`;
});
console.log(htmlText);
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jmikelpearson@gmail.com',
            pass: '69Lonwulf'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'jmikelpearson@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        // text: text, // plain text body
        html: htmlText, // html body
        data: data 
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});