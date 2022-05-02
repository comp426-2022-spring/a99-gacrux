# Health Tracker Website Instruction

Our website aims to track our users' mental and physical health. After signing up, people can get access to the account and health information they provide to our database and get access some valuable resources that may help in imporivng their health. 

Our website basically has two main function:
1. Tracker - Input and/or update users' health data. 
2. Resources - View resources that may help imporive your health! 

# Health Tracker Installation

Run `npm install` inside the package root directory.

This package was buid using Node.js LTS (16.x).
Other package dependency and version information can be found in `package.json`.

# Start The Server
Run `npm test` to start the server run at port 5000.
You will see the below messages printed in the terminal:
```
> a99-gacrux@0.5.0 test
> npx nodemon index.js --port=5000 --debug

[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js --port=5000 --debug`
User database table exists.
Health database table exists.
Log database table exists.
App is running on port 5000

```
# Coinserver Runtime Documentation
If your `server.js` script is run with the option `--help`, it should echo ONLY the following help message to STDOUT and then exit 0.
```
node server.js [options]

--port, -p	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535. Defaults to 5000.

--debug, -d If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log, -l   If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help, -h	Return this message and exit.
```
## Endpoints

### /app/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/
```

#### Response body

```
{"message":"Your API works! (200)"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/users/addhealth (POST)

#### Request cURL

```
curl http://localhost:5000/app/users/addhealth
```

#### Response body

```
New user input:
{"status": "Health info added."}

Established user update:
{"status": "Health info updated successfully."}
```

#### Response headers

```

```

### /app/users/seehealth/ (POST)

#### Request cURL

```
curl http://localhost:5000/app/users/seehealth
```

#### Response body

```
Invalid username:
{"status": "invalid"}

Valid username:
{"status":"valid", "age": row.age, "height": row.height, "weight": row.weight, "bloodPressure": row.bloodPressure, "bfi": row.bfi, "mood": row.mood, "stress": row.stress, "exercise": row.exercise, "sleep": row.sleep, "goals": row.goals }
```

#### Response headers

```

```

### /app/users/login/ (POST)

#### Request cURL

```
curl http://localhost:5000/app/users/login/
```

#### Response body

```
Invalid username or password:
{"status": "invalid", "email": ""}

Valid username and password:
{"status": "valid", "email": row.email}
```

#### Response headers

```

```

### /app/users/signup/ (POST)

#### Request cURL

```
curl http://localhost:5000/app/users/signup/
```

#### Response body

```
{"emailstatus": emailstatus, "userstatus": userstatus}
```

#### Response headers

```

```

### /app/users/delete/ (POST)

#### Request cURL

```
curl http://localhost:5000/app/users/delete/
```

#### Response body

```

```

#### Response headers

```

```

### /app/log/access/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/log/access/
```

#### Response body

```

```

#### Response headers

```

```

### /app/flip/call/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"guess":"heads"}' http://localhost:5000/app/flip/call/
```

#### Response body

```
{"call":"heads","flip":"heads","result":"win"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpEFlRc"
Date: Thu, 07 Apr 2022 16:30:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coins/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"number":"30"}' http://localhost:5000/app/flip/coins/`
```

#### Response body

```
{"raw":["heads","heads","heads","tails","heads","heads","tails","tails","tails","heads","heads","heads","heads","heads","heads","tails","tails","heads","heads","heads","heads","heads","heads","heads","tails","heads","tails","heads","tails","heads"],"summary":{"heads":21,"tails":9}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 283
ETag: W/"11b-9dPTqGfngSPFEOq4loChIlpdSIE"
Date: Thu, 07 Apr 2022 15:23:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/access/ (GET)

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/log/access/ (GET)

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/log/error/ (GET)

_Not yet implemented_

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/user/login/ (POST)

_Not yet implemented_

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/user/new/ (POST)

_Not yet implemented_

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/user/update/ (PATCH)

_Not yet implemented_

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/user/delete/ (DELETE)

_Not yet implemented_

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```
