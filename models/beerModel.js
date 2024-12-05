const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../db/beer.db');

const db = new sqlite3.Database(dbPath);

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS beers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            description TEXT,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.exec(createTableQuery);
