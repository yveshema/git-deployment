const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const creds = require('./config');

const  app = express();

app.use(bodyParser.json());

app.use(express.static('assets'));

const port = 3000;
app.listen(port, function() {
    console.log('Server listening on port ' + port)
});

//Configure nodemailer transport
const transport = {
    host: creds.HOST,
    port: 465,
    secure: true,
    auth: {
	user: creds.USER,
	pass: creds.PASS
    }
}

const transporter = nodemailer.createTransport(transport);

//Check that all is well with the mailer
transporter.verify((error,success) => {
    if (error) {
	console.log(error);
    } else {
	console.log('Server is ready to take messages');
    }
});

//Handle the contact form data
app.post('/send', (req,res) => {
    let email = req.body.email;
    let message = req.body.message;
    let content = `email: ${ email } \n message: ${ message } `;

    let mail = {
	from: creds.USER,
	to: creds.RECIPIENT,
	subject: 'New Message from Contact Form',
	text: content
    }

    transporter.sendMail(mail, (err,data) => {
	if ( err ) {
	    console.log(err);
	    res.json({
		msg: 'fail'
	    });
	} else {
	    res.json({
		msg: 'success'
	    });
	}
    });
});
