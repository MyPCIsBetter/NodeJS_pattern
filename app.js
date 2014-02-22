
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var pages = require('./routes/sitesList').pages;
var code = require("./code");

var app = express();

//oszukujemy troszkê Visual Studio ;)
ejs.open = '<script name="nodeEJS">';
ejs.close = '</script>';

// all environments
app.engine('.html', require('ejs').__express);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use('/fortestonly', express.static(__dirname + '/testing'));
app.use(function(req, res, next){
    code.start(req, res);

    next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
 *  Place your test pages in "testing" folder.
 *  When code do what you want, place it in views folder and add it in routes/sitesList.js
 */

app.get('/', pages["index"]);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
