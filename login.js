const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const encoder = bodyParser.urlencoded();


const app = express();
app.use(express.static('welcome.css'));

app.use("/assets", express.urlencoded({
    extended: true
}))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quizzme'
});

connection.connect(function (err) {
    console.log('Connected to the database successfully!');

});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

});

app.post('/', encoder, (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    connection.query('SELECT * FROM Accounts WHERE email = ? AND password = ?', [email, password], (err, results, fields) => {
        express.response.setHeader('Content-Type', 'text/html');
        if (results.length > 0) {
            res.redirect('/welcome.html');
        } else {
            res.redirect('/');
        }
        res.send('Email or password is incorrect');
    });
});
app.get('/welcome', (req, res) => {
    res.sendFile(__dirname + '/welcome.html');
});
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

