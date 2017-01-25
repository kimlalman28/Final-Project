var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public')); //allow use to style.css

app.set('view engine', 'ejs'); //to use ejs
app.set('views', './views')

var DATABASE_URL = process.env.DATABASE_URL ||'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/songs';

app.get('/home', function(req, res){
	res.render('home');
})

/*app.post('/home', function(req, res){
	pg.connect(DATABASE_URL, function(err, client, done){
		client.query(`insert into purchased(song, artist, price) values ()`, function(err, result){
			res.redirect('/purchasedsongs');
			done();
			pg.end();
		})
	})
})*/

app.get('/purchasedsongs', function(req, res){
	pg.connect(DATABASE_URL, function(err, client, done){
		client.query(`select * from purchased`, function(err, result){
			res.render('purchasedsongs', {data: result.rows});
			done();
			pg.end();
		})
		
	})
})

app.listen(3000, function(){
	console.log("App Listening")
})