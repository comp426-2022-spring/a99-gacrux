const Database = require('better-sqlite3')

const db2 = new Database('./data/health.db')

const stmt = db2.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='health';`)
let row = stmt.get();
if(row === undefined) {
    console.log('Health database appears to be empty. Creating user database...')

    const sqlInit = `
        CREATE TABLE health ( 
            id INTEGER PRIMARY KEY,
            username TEXT,
            age INTEGER,
            height INTEGER,
            weight INTEGER,
            bloodPressure FLOAT,
            bfi FLOAT,
            mood TEXT,
            stress INTEGER,
            exercise INTEGER,
            sleep INTEGER,
            goals TEXT
            );
        `;
    db2.exec(sqlInit)
} else {
    console.log('Health database exists.')
}

module.exports = db2