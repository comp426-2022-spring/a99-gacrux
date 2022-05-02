# Health Tracker Website Instruction

Our website aims to track our users' mental and physical health. After signing up, people can get access to the account and health information they provide to our database and get access some valuable resources that may help in improivng their health. 

Our website basically has two main function:
1. Tracker - Input and/or update users' health data. 
2. Resources - View resources that may help imporive your health! 

# Health Tracker Installation
Use HTTPS link to clone our repository on your local computer.
Run the command below to install the modules needed.
```
npm install
```

This package was buid using Node.js LTS (16.x). You can download the Node.js on your computer [through this link](https://nodejs.org/en/).
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
Open the Google Chrome browser on your local computer and type the base URL `localhost:5000` to connect to the server. You will see the home page of our website. On the top right corner, users can choose to log in with the existing account or sign up for a new account (Personal Health Info is only available after the user log in to their account). After logging in to the account, people can save their own health information or update their old records. They can also use the `Recourses` tab to get access to important health tips.

# API Endpoint Documentation
All API Documentation is located under the `/docs` directory.

# Coinserver Runtime Documentation
## --help
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

# Dependencies
`
    "better-sqlite3": "^7.5.1",
    "express": "^4.18.1",
    "minimist": "^1.2.6",
    "morgan": "^1.10.0",
    "node": "^17.7.2",
    "nodemon": "^2.0.15"
`
