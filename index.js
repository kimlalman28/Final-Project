var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public')); //allow use to style.css

app.set('view engine', 'ejs'); //to use ejs
app.set('views', './views')

var DATABASE_URL = process.env.DATABASE_URL ||'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/songs';


app.get('/', function(req, res){
	res.redirect('/songsearch')
})

app.get('/songsearch', function(req, res){
	res.render('home');
})



app.post('/songsearch', function(req, res){
	pg.connect(DATABASE_URL, function(err, client, done){
		client.query(`insert into purchased (song, artist, price, buyinfo) values ('${req.body.song}', '${req.body.artist}', '${req.body.price}', '${req.body.buyinfo}')`, function(err, result){
			done();
			pg.end();
		})
	})
})

app.get('/addedsongs', function(req, res){
	pg.connect(DATABASE_URL, function(err, client, done){
		client.query(`select * from purchased`, function(err, result){
			res.render('purchasedsongs', {data: result.rows});
			done();
			pg.end();
		})
		
	})
})

app.get('*', function(req, res){
	res.status(404).send("Page not found! Try route to /home" )
})

app.listen(port, function(){
	console.log("App Listening")
})