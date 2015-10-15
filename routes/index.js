/**
 * Created by Michael on 07.10.2015.
 */
var HttpError = require('../error').HttpError;

module.exports = function(app){

    var bodyParser = require('body-parser');
    var userRouter = require('./user');
    var contentRouter = require('./content');
    var adminRouter = require('./admin');

    app.use(bodyParser.json());

    app.get('/', function(req, res, next){
        res.sendfile('index.html', {userId: req.user});
    });

    app.post('/registration', require('./registration').post);
   // app.post('/login', require('./login').post);

    app.use('/users', userRouter);
    app.use('/content', contentRouter);
    app.use('/admin', adminRouter);

    /*app.use(function(req, res, next) {
        var err = new HttpError(404, 'Not Found');
        next(err);
    });*/

    app.use(function(err, req, res, next){
        if(typeof err == 'number'){
            err = new HttpError(err);
        }

        if(err instanceof HttpError){
            res.sendHttpError(err);
        }else {
            var status = err.status || 500;
            res.status(status).send(err);
        }
    });
};