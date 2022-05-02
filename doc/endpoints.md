# Endpoints
## /app/log/access (GET)
### Request cURL
```
curl http://localhost:5000/app/log/access
```
### Response headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 26869
ETag: W/"68f5-4/kC/BL2xfS7cE4nnyjFcsCBlno"
Date: Mon, 02 May 2022 04:38:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
## /app/users/addhealth (POST)
### Request cURL
```
curl http://localhost:5000/app/users/addhealth
```
### Response body
```
New user input:
{"status": "Health info added."}

Established user update:
{"status": "Health info updated successfully."}
```
## /app/users/seehealth/ (POST)
### Request cURL
```
curl http://localhost:5000/app/users/seehealth
```
### Response body
```
Invalid username:
{"status": "invalid"}

Valid username:
{"status":"valid", "age": row.age, "height": row.height, "weight": row.weight, "bloodPressure": row.bloodPressure, "bfi": row.bfi, "mood": row.mood, "stress": row.stress, "exercise": row.exercise, "sleep": row.sleep, "goals": row.goals }
```
## /app/users/login/ (POST)
### Request cURL
```
curl http://localhost:5000/app/users/login/
```
### Response body
```
Invalid username or password:
{"status": "invalid", "email": ""}

Valid username and password:
{"status": "valid", "email": row.email}
```

## /app/users/signup/ (POST)

### Request cURL
```
curl http://localhost:5000/app/users/signup/
```
### Response body
```
{"emailstatus": emailstatus, "userstatus": userstatus}
```
## /app/users/delete/ (POST)
### Request cURL
```
curl http://localhost:5000/app/users/delete/
```
## /app/log/access/ (GET)
### Request cURL
```
curl http://localhost:5000/app/log/access/
```