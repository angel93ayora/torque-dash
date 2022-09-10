let config = {
    port: process.env.PORT || 8081,
    db: {
        data: {
            dialect: 'sqlite',
            storage: 'db.sqlite'
        },
        options: {
            logging: false
        }
    },
    session: {
        keys: process.env.SESSION_KEYS || ['6a5w4d65a4wd', 'a65w4d6aw4d89a4', '65f4b8b4szd8']
    }
};

module.exports = config;