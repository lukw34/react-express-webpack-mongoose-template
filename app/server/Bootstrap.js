const Logger = require('./utils/Logger');
const Express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const winston = require('winston');
const mongoose = require('mongoose');
const winstonRequestLogger = require('winston-request-logger');
const MongooseUtils = require('./utils/Mongo');
const routes = require('./routes');
const ErrorController = require('./controllers/ErrorController');
const {
    NODE_ENV,
    MONGO_DB_URL
} = require('./config');

class Bootstrap {
    constructor() {
        this.Express = Express;
        this.bodyParser = bodyParser;
        this.MongooseUtils = MongooseUtils;
        this.ErrorController = ErrorController;
        this.winstonLogger = new(winston.Logger)({
            transports: [new(winston.transports.Console)({
                colorize: true
            })]
        });
        this.publicPath = path.join(__dirname, '/../../public');
        this.isTest = NODE_ENV === 'test';
        this.port = process.env.PORT || 9004;

        //global variable

        global.logger = new Logger();
        global.Mongo = new this.MongooseUtils(mongoose);
    }

    run() {
        global.logger.log('Run application ...');
        if (MONGO_DB_URL) {
            global.Mongo.connect(this.mongo).then(() => {
                this._startExpress();
            }).catch(({
                message
            }) => {
                global.logger.error(message);
            });
        } else {
            this._startExpress();
        }
    }

    _startExpress() {
        const app = new this.Express();

        if (!this.isTest) {
            app.use(winstonRequestLogger.create(this.winstonLogger, {
                method: ':method',
                url: ':url[pathname]'
            }));
        }

        app.use(this.bodyParser.json());
        app.use(this.bodyParser.urlencoded({
            extended: false
        }));
        app.use(this.Express.static(this.publicPath));
        app.use('/api', routes);
        app.get('*', (req, res) => {
            res.sendFile(path.join(this.publicPath, 'index.html'));
        });

        app.use(this.ErrorController.errorHandler);

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

        return app;
    }
}

module.exports = Bootstrap;