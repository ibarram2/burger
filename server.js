var bodyParser = require('body-parser');
var express = require('express');
var mysql = require('mysql');

var methodOverride = require('method-override')
var exphbs  = require('express-handlebars');

var app = express();
var PORT = process.env.PORT || 8080;
 
app.get('/', function (req, res) {
  res.send('Hello Burger!')
});
 

 
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());
 
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
});

app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});
 
 //handlebars portion - double check!!

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});

// override with the X-HTTP-Method-Override header in the request 
app.use(methodOverride('X-HTTP-Method-Override'));


//MySql connection

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'D1ssolve',
  database: 'burgers_db'
});
 
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  connection.end();
});