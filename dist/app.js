
const express = require('express')
const app = express();
const http = require('http').Server(app);
const swig = require('swig');
const session = require('express-session');
app.use(session({
	secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.set('views','/');
app.set('view engine','html');
app.engine('html', swig.renderFile);
app.use('/',express.static(__dirname));
let appData = require('./data.json');

app.get('/',function(req,res,next){
	res.render('index');
	console.log('yes')
})
let seller = appData.seller;
let goods = appData.goods;
let ratings = appData.ratings;

app.get('/api/seller',function(req,res,next){
	res.json({
      // 这里是你的json内容
      errno: 0,
      data: seller

    })
})
app.get('/api/goods',function(req,res,next){
	res.json({
      // 这里是你的json内容
      errno: 0,
      data: goods

    })
})
app.get('/api/ratings',function(req,res,next){
	res.json({
      // 这里是你的json内容
      errno: 0,
      data: ratings

    })
})
http.listen(3001,'127.0.0.1')