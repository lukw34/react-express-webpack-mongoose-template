class ErrorController {
    static errorHandler(err, req, res, next) {
        res.status(500);
        res.send('error', {error: err})
    }
}

module.exports = ErrorController;