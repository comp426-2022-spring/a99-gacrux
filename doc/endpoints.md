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
