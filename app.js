const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

//view engine
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public',express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
	res.render('contact');
});

//const output;
app.post('/send',(req,res)=>{
	const output = '<h3>Contact details</h3><ul><li>Name : ${req.body.name}</li><li>Email : ${req.body.email}</li><li>subject : ${req.body.subject}</li><li>msg : ${req.body.message}</li></ul>'

	let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'piyushravat7@gmail.com', // generated ethereal user
            pass: 'phRavat_13' // generated ethereal password
        },
        tls:{
	 		rejectUnauthorized:false
		}
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <piyushravat7@gmail.com>', // sender address
        to: 'piyushravat07@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: output//'<b>Hello world?</b>' // html body
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
app.listen('3000',()=>{
	console.log("Server started at 3000 port");
})