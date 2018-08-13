const mongoose = require('mongoose');

class Mongo {
    constructor() {
        this.client = null;
    }

    async connect({ host = 'localhost', port = 27017, name = '' }) {
        global.logger.log('Connecting to MongoDB...');
        this.client = await mongoose.connect(`mongodb://${host}:${port}/${name}`, { useNewUrlParser: true });
        global.logger.log('MongoDB connection is established.');
    }
}

module.exports = Mongo;
