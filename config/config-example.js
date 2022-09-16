let config = {
    port: process.env.PORT || 8081,
    db: {
        // SQL engines
        connectionParam: process.env.DATABASE_URL || 'engine://user:pass@host:port/dbname',
        // SQLite see below
        options: {
            logging: false
        }
    },
    session: {
        keys: process.env.SESSION_KEYS || ['6a5w4d65a4wd', 'a65w4d6aw4d89a4', '65f4b8b4szd8']
    }
};

// SQLite config
if (config.db.connectionParam == "sqlite") {
    config.db.connectionParam = {
        dialect: 'sqlite',
        storage: 'db.sqlite'
    };
}

module.exports = config;