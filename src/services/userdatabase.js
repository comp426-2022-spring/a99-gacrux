const Database = require('better-sqlite3')

const db2 = new Database('./data/user.db')

const stmt = db2.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='myUsers';`)
let row = stmt.get();
if(row === undefined) {
    console.log('User database appears to be empty. Creating user database...')

    const sqlInit = `
        CREATE TABLE myUsers ( 
            id INTEGER PRIMARY KEY,
            username TEXT,
            email TEXT,
            password TEXT);
        `;
    db2.exec(sqlInit)
} else {
    console.log('User database exists.')
}

module.exports = db2