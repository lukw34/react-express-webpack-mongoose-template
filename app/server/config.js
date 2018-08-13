const getEnv = env => process.env[env] || '';

module.exports = {
    DB_HOST: getEnv('DB_HOST'),
    DB_PORT: getEnv('DB_PORT'),
    DB_NAME: getEnv('DB_NAME'),
    NODE_ENV: getEnv('NODE_ENV')
};