const Logger = require('./utils/Logger'),
    Express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    winston = require('winston'),
    mongoose = require('mongoose'),
    winstonRequestLogger = require('winston-request-logger'),
    MongooseUtils = require('./utils/Mongo'),
    routes = require('./routes'),
    ErrorController = require('./controllers/ErrorController');

class Bootstrap {
    constructor() {
        this.Express = Express;
        this.bodyParser = bodyParser;
        this.MongooseUtils = MongooseUtils;
        this.ErrorController = ErrorController;
        this.winstonLogger = new (winston.Logger)({transports: [new (winston.transports.Console)({colorize: true})]});
        this.publicPath = path.join(__dirname, '/../../public');

        this.port = process.env.PORT || 9004;
        this.mongo = 'mongodb://localhost/template_db';

        //global variable
        global.logger = new Logger();
        global.Mongo = new this.MongooseUtils(mongoose);
    }

    run() {
        global.logger.log('Run application ...');

        global.Mongo.connect(this.mongo).then(() => {
            this._startExpress(routes);
        }).catch(({message}) => {
            global.logger.error(message);
        });
    }

    _startExpress(routing) {
        const app = new this.Express();

        app.use(winstonRequestLogger.create(this.winstonLogger, {
            method: ':method',
            url: ':url[pathname]'
        }));

        app.use(this.bodyParser.json());
        app.use(this.bodyParser.urlencoded({extended: false}));
        app.use(this.Express.static(this.publicPath));

        app.get('*', (req, res) => {
            res.sendFile(path.join(this.publicPath, 'index.html'));
        });

        app.use(this.ErrorController.errorHandler);
        app.use('/', routing);

        this.server = app.listen(this.port, err => {
            if (err) {
                global.logger.error('Application runtime error !');
            } else {
                global.logger.log(`Application start on port: ${this.port}`);
            }
        });

        this.server.on('error', () => {
            global.logger.error('Application runtime error !');
            process.exit(1);
        });
    }
}

module.exports = Bootstrap;