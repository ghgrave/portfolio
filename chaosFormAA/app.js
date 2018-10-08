const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// directs files from public folder (CSS, etc... to be used)
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// sets which directory to look in
app.set('views', './views') //TODO: delete?

// Mongo Connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// builds the schema for data to be sent to mongo
const eventSchema = new mongoose.Schema({
    date: String,
    event_title: String,
    event_desc: String,
    contact_name: String,
    contact_info: String,
    sub_contact_name: String,
    sub_contact_info: String,
    approved: Boolean
});

// creates model called Event that uses the event schema and assigns to collection called events
// NOTE: when this gets sent to mongo 'Event' becomes a collection called events
let Event = mongoose.model('Event', eventSchema);

// connects to specific database - NOTE: in this case we were using PostGRES SQL site
mongoose.connect(`mongodb://localhost:27017/childrenaa`)
.then(
  ()    => console.log('connected to mongod on server.accsoftwarebootcamp.com:27017')
).catch(
  (err) => console.log('error in connecting to mongo', err)
);




// //NOTE: root path for home page
// app.get('/', (req,res) => {
//     //__dirname : It will resolve to your project folder.
//     res.render('home.ejs');
// });


// NOTE: when home page loads
const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                    ];
const weekDay   = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
app.get('/', (req, res) => {
    
    Event.find({approved: true}, (err, data) => {
        console.log(data);
        res.render('home.ejs', 
            {data: data.sort((a, b) => a.date - b.date), 
            monthNames: monthNames, 
            weekDay: weekDay });
    });   
});

// NOTE: renders form.ejs when /form path called from click event
app.get('/form', (req,res) => {
        //__dirname : It will resolve to your project folder.
        res.render('form.ejs');
    });

// NOTE: POSTS data from dB
// sets error var to true which prevents data from submitting
let error = true;
app.post('/submitData', (req, res) => {
   
    // assigns form data (based on req.body)
    let data = req.body;

    // calls function to test date and make sure submitted in correct format
    dateError = dateValidate(data.date);

    // sets event contact name to N/A if empty, otherwise, stays the same as user
    (!data.contact_name) ? data.contact_name = 'N/A' : data.contact_name;

    // tests for user input for optional contact name and info
    if(!data.contact_info) {
        data.contact_info = 'N/A'; // no info then assigns N/A
        contactError = false; // ensures error is false in order to send
    } else { // if there is user input, tests for correct format
        let info = data.contact_info_option;
        let contact = data.contact_info;

        // assigns result of format test
        contactError = contactInfo(info, contact);
    };
    
    // sets approved key to false, this will be used to prevent accidental displaying on site
    // until approved by admin BUT will still be saved on dB
    data.approved = false;
    

    // assigns vars to be passed for testing format info type of required submission user info
    info = data.sub_contact_info_option;
    contact = data.sub_contact_info;
    subContactError = contactInfo(info, contact);
        
    error = dateError + subContactError + contactError;

    // TODO: not needed if using required?
    // error = formValidate(data);
    
    console.log('error = ' + error);
    if(!error) {
        
        // creates a new Event object and assigns data
        let chaosEvent = new Event(data);
        // saves form data to mongodB
        chaosEvent.save(function (err, data) {
            sendUpdateEmail(data);
            // is error......?
            if (err) return console.error(err);
            });
        console.log('This is returned data :' + data);
        console.log('Data id is ' + data._id);
        res.redirect('/');
        
    } else {
        res.send('ERROR!!!!');
    }; // closes conditional
});

app.get('/update', (req, res) => {
    Event.find({approved: false}, (err, data) => {
        
        res.render('update.ejs', 
            {data: data.sort((a, b) => a.date - b.date), 
            });
    });
});

app.get('/updateEvent/:id', (req, res) => {
    Event.find({_id: req.params.id}, (err, data) => {
        res.render('updateEvent.ejs',
                {
                    data: data
                });
    });
});

app.post('/updateData/:id', (req, res) => {
    let data = req.body;

    console.log(data);
    console.log(data.approval);
    if (data.approval == 'APPROVED') {
        data.approved = true;
        Event.update({_id: req.params.id}, data, (err, data) => {
            (!err) ? res.redirect('/update') : res.send('ERROR!!!!');
        });
    } else {
        data.approved = false;
        res.redirect('/update');
    };
});



app.listen(3000, () => {
    console.log('Listening on port 3000');
});

// function to test that user input is enetered in correct date format
dateValidate = (date) => {
    // resets error every time form is submitted to prevent submittal if true
    error = true;
    // sets regex for testing date format:
    // MUST have 2 digits followed by / 2 digits / and 4 digits - any numbers or less than 10 char
    // will cause false result
    let regex = /((\d{2})\/(\d{2})\/(\d{4}))/;
    // if test is true, set error to false which will allow submittal, otherwise, error defaults back to true
    if ( regex.test(date) ){
        error = false;
    };
    return error;
};

// function that tests phone and email match correct format
contactInfo = (info, data) => {
    let regexPhone = /(\((\d{3})\)(\d{3})\-(\d{4}))/;
    let regexEmail = /(([\w\.\-]*)\@([\w\.\-]+))/;
    if(info == 'Phone') {
        (regexPhone.test(data)) ? error = false : error = true;
    } else {
        (regexEmail.test(data)) ? error = false : error = true;
    };
    return error;
};

sendUpdateEmail = (data) => {
    let key = Object.keys(data);
    console.log('This is list of keys:' + key);
    console.log(data.date);
    let htmlText ='';
    key.forEach((eventKey) => {
        console.log(data[eventKey]);
        htmlText = htmlText + `<p>${eventKey}: ${data[eventKey]}</p>`;
    });
    // adds http link for updating events
    htmlText = htmlText + '<a href="http://localhost:3000/update">Click here to update Events</a>';
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

        });
    });
};