const { coinFlip, coinFlips, countFlips, flipACoin } = require('./modules/coin.js');
const express = require("express")
const app = express()
app.use(express.json())
app.use(express.static('./public'));

const morgan = require('morgan')
const fs = require('fs')

const logdb = require('./src/services/logdatabase.js')
const userdb = require('./src/services/userdatabase.js')
const healthdb = require('./src/services/healthdatabase.js')
const args = require("minimist")(process.argv.slice(2))  


const log = args.log || "true"
const help = args.help
const debug = args.debug
const port = args.port || 5555

if (help === true) {
    console.log(`server.js [options]

    --port	Set the port number for the server to listen on. Must be an integer
                between 1 and 65535.

    --debug	If set to \`true\`, creates endlpoints /app/log/access/ which returns
                a JSON access log from the database and /app/error which throws 
                an error with the message "Error test successful." Defaults to 
                \`false\`.

    --log		If set to false, no log files are written. Defaults to true.
                Logs are always written to database.
    
                --help	Return this message and exit.`)
    process.exit(0)
    
}

if(log === "true"){
    const WRITESTREAM  = fs.createWriteStream('./log/access.log', { flags: 'a' })
    app.use(morgan('combined', { stream: WRITESTREAM }))
}

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

app.use( (req, res, next) => {
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        secure: req.secure,
        status: res.statusCode,
        referer: req.headers['referer'],
        useragent: req.headers['user-agent']
    }
    const stmt = logdb.prepare(`INSERT INTO accesslog (remoteaddr, 
        remoteuser, time, method, url, protocol, httpversion, secure, 
        status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    const info = stmt.run(String(logdata.remoteaddr), String(logdata.remoteuser), String(logdata.time), 
        String(logdata.method), String(logdata.url), String(logdata.protocol), String(logdata.httpversion), String(logdata.secure), 
        String(logdata.status), String(logdata.referer), String(logdata.useragent))
    next()
})

if (debug) {
    app.get("/app/log/access", (req, res) => {	
        try {
            const stmt = logdb.prepare('SELECT * FROM accesslog').all()
            res.status(200).json(stmt)
        } catch {
            console.error(e)
        }
    });
    app.get('/app/error', (req, res) => {
        throw new Error('Error test successful.');
    });
}

app.post("/app/users/addhealth/", (req, res, next) => {	
    const stmt = healthdb.prepare(`SELECT * FROM health WHERE username=?`)
    let row = stmt.get(String(req.body.username));
    console.log(req.body)
    if(row === undefined) {
        const stmt2 = healthdb.prepare(`INSERT INTO health (username, height, weight, bloodPressure, bfi) VALUES (?, ?, ?, ?, ?)`)
        const info = stmt2.run(String(req.body.username), String(req.body.height), String(req.body.weight), String(req.body.bloodPressure), String(req.body.bfi))
        res.status(200).json({"status": "Health info added."})
    } else {
        const stmt3 = healthdb.prepare(`UPDATE health SET height=?, weight=?, bloodPressure=?, bfi=? WHERE username=?;`)
        const info = stmt3.run(String(req.body.height), String(req.body.weight), String(req.body.bloodPressure), String(req.body.bfi), String(req.body.username))
        res.status(200).json({"status": "Health info updated successfully."})
    }
});

app.post("/app/users/seehealth/", (req, res, next) => {	
    const stmt = healthdb.prepare(`SELECT * FROM health WHERE username=?`)
    let row = stmt.get(String(req.body.username));
    console.log(row)
    if(row === undefined) {
        res.status(200).json({"status": "invalid"})
    } else {
        res.status(200).json({"status": "valid", "height": row.height, "weight": row.weight, "bloodPressure": row.bloodPressure, "bfi": row.bfi })
    }
});



app.post("/app/users/login/", (req, res, next) => {	
    const stmt = userdb.prepare(`SELECT * FROM myUsers WHERE username=? AND password=?`)
    let row = stmt.get(String(req.body.username), String(req.body.password));
    if(row === undefined) {
        res.status(200).json({"status": "invalid", "email": ""})
    } else {
        res.status(200).json({"status": "valid", "email": row.email})
    }
});


app.post("/app/users/signup/", (req, res, next) => {	
    const stmt = userdb.prepare(`SELECT * FROM myUsers WHERE username=?`)
    let userrow = stmt.get(String(req.body.username));
    const stmt2 = userdb.prepare(`SELECT * FROM myUsers WHERE email=?`)
    let emailrow = stmt.get(String(req.body.email));
    var emailstatus = "valid"
    var userstatus = "valid"
    if(userrow !== undefined) {
        emailstatus = "invalid" 
    } else if(emailrow !== undefined) {
        userstatus = "invalid"
    } else {
        const stmt3 = userdb.prepare(`INSERT INTO myUsers (username, email, password) VALUES (?, ?, ?)`)
        const info = stmt3.run(String(req.body.username), String(req.body.email), String(req.body.password))
    }
    res.status(200).json({"emailstatus": emailstatus, "userstatus": userstatus})
});

app.post("/app/users/delete/", (req, res, next) => {	
    const stmt = userdb.prepare(`DELETE FROM myUsers WHERE username=?;`)
    let row = stmt.run(String(req.body.username));
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
});


app.get('/app/flip/', (req, res) => {
    res.status(200).json({"flip": coinFlip()})
})

app.post('/app/flips/coins/', (req, res, next) => {
    const result = coinFlips(parseInt(req.body.number))
    const count = countFlips(result)
    res.status(200).json({"raw": result, "summary": count})
})

app.post('/app/flip/call/', (req, res, next) => {
    res.status(200).json(flipACoin(req.body.call))
})

app.get('/app/', (req, res) => {
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
})

app.use(function(req, res) {
    res.status(404).send("404 NOT FOUND")
    res.type("text/plain")
})

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server closed')
    })
})