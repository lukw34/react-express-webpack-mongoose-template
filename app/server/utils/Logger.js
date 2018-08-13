const colors = require('colors');
const dateFormat = require('dateformat');

/**
 * Class to log information/warnings/errors
 */
class Logger {
    constructor(isTest) {
        this.isTest = isTest;
        this.colors = colors;
        this.dateFormat = dateFormat;
    }

    _getDate() {
        return this.dateFormat(new Date(), 'mmmm dS, yyyy, h:MM:ss TT');
    }

    _printLogs(text, color) {
        if (!this.isTest) {
            /* eslint-disable-next-line */
            console.log(`${this._getDate()}: ${color(text)}`);
        }
    }

    warn(warning) {
        this._printLogs(warning, this.colors.yellow);
    }

    error(error) {
        this._printLogs(error, this.colors.red.bold);
    }

    log(log) {
        this._printLogs(log, this.colors.green.underline);
    }
}

module.exports = Logger;
