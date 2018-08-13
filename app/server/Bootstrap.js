const winstonRequestLogger = require('winston-request-logger');
const Express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const winston = require('winston');

const Logger = require('./utils/Logger');
const MongooseUtils = require('./utils/Mongo');
const routes = require('./routes');
const ErrorController = require('./controllers/ErrorController');
const {
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = require('./config');

class Bootstrap {
    constructor() {
        this.Express = Express;
        this.bodyParser = bodyParser;
        this.ErrorController = ErrorController;
        this.winstonLogger = winston.createLogger({
            transports: [new (winston.transports.Console)({
                colorize: true
            })]
        });
        this.publicPath = path.join(__dirname, '/../../public');
        this.isTest = NODE_ENV === 'test';
        this.port = process.env.PORT || 9004;


        global.logger = new Logger(this.isTest);
        global.Mongo = new MongooseUtils();
    }

    async run() {
        global.logger.log('Run application ...');
        try {
            await global.Mongo.connect({
                host: DB_HOST,
                port: DB_PORT,
                name: DB_NAME
            });
            return this.startExpress();
        } catch (e) {
            global.logger.error(`Mongo: ${e.message}`);
            return this.startExpress();
        }
    }

    startExpress() {
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
                global.logger.error(err);
            } else {
                global.logger.log(`Application start on port: ${this.port}`);
            }
        });

        this.server.on('error', err => {
            global.logger.error('Application runtime error !');
            global.logger.error(err.message);
            process.exit(1);
        });

        return this.server;
    }
}

module.exports = new Bootstrap();