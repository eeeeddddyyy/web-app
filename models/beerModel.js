const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDirectory = path.join(__dirname, '../db');
const dbPath = path.join(dbDirectory, 'beer.db');

if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory, { recursive: true }); 
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
        return;
    }

    console.log('Connected to SQLite database.');

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS beers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            description TEXT,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.exec(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating beers table:', err.message);
        } else {
            console.log('Beers table is ready.');
        }
        
        db.close((closeErr) => {
            if (closeErr) {
                console.error('Error closing the database:', closeErr.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    });
});

module.exports = db;
