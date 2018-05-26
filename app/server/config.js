const getEnv = env => process.env[env] || '';

module.exports = {
    MONGO_DB_URL: getEnv('MONGO_DB_URL'),
    NODE_ENV: getEnv('NODE_ENV')
};