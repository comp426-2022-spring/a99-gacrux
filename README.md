# Health Tracker Description

This package allows you to track your mental and physical health, and provides some resources that may help in imporivng your health. 

1. Tracker - Input and/or update health data. 
2. Resources - View resources that may help imporive your health! 

# Health Tracker Installation

Run `npm install` inside the package root directory.

This package was buid using Node.js LTS (16.x).
Other package dependency and version information can be found in `package.json`.

# Coinserver Runtime Documentation
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

# Coinserver API Documentation

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

### /app/flip/ (GET)

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/flips/:number/ (GET)

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/flip/coin/ (GET)

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/flip/call/:guess/ (GET)

#### Request cURL

```

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
