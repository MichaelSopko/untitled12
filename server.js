/**
 * Created by Michael on 07.10.2015.
 */
var express = require('express');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var config = require('./config');

var port = process.env.PORT || config.get('port');
var db;
var app = express();
mongoose.schemas = {};

require('./models');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());

mongoose.connect('localhost', 'mytestDb', 27017);

db = mongoose.connection;

var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongoose_connection: mongoose.connection})
}));

app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/loadUser'));

db.on('error', function(err){
    console.error(err);
    throw err;
});

db.once('open', function(){

    require('./routes')(app);

    app.use(express.static(__dirname + '/public'));

    app.listen(port, function(){
        console.log("Express server listening on port " + port);
        console.log("HOST: " + "http://localhost:" + port);
    });

});