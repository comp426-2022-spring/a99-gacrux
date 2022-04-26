const Database = require('better-sqlite3')

const db = new Database('./data/user.db')

const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='myUsers';`)
let row = stmt.get();
if(row === undefined) {
    console.log('User database table appears to be empty. Creating user database table...')

    const sqlInit = `
        CREATE TABLE myUsers ( 
            id INTEGER PRIMARY KEY,
            username TEXT,
            email TEXT,
            password TEXT);
        `;
    db.exec(sqlInit)
} else {
    console.log('User database table exists.')
}

const stmt2 = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='health';`)
let row2 = stmt2.get();
if(row2 === undefined) {
    console.log('Health database table appears to be empty. Creating user database table...')

    const sqlInit = `
        CREATE TABLE health ( 
            id INTEGER PRIMARY KEY,
            FOREIGN KEY (username) REFERENCES myUsers(username) TEXT,
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
    db.exec(sqlInit)
} else {
    console.log('Health database table exists.')
}

const stmt3 = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`)
let row3 = stmt3.get();
if(row3 === undefined) {
    console.log('Log database table appears to be empty. Creating log database table...')

    const sqlInit = `
        CREATE TABLE accesslog ( 
            id INTEGER PRIMARY KEY,
            remoteaddr TEXT,
            remoteuser TEXT,
            time TEXT,
            method TEXT,
            url TEXT,
            protocol TEXT,
            httpversion TEXT,
            secure TEXT,
            status TEXT,
            referer TEXT,
            useragent TEXT);
        `;
    db.exec(sqlInit)
} else {
    console.log('Log database table exists.')
}

module.exports = db