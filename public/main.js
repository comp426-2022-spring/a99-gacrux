// Focus div based on nav button click

// Flip one coin and show coin image to match result when button clicked

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button

const hnav = document.getElementById("homenav")
hnav.addEventListener("click", function() { focusDiv("home"); })

const snav = document.getElementById("singlenav")
snav.addEventListener("click", function() { focusDiv("single"); })

const mnav = document.getElementById("multinav")
mnav.addEventListener("click", function() { focusDiv("multi"); })

const gnav = document.getElementById("guessnav")
gnav.addEventListener("click", function() { focusDiv("guess"); })

const linav = document.getElementById("loginnav")
linav.addEventListener("click", function() { focusDiv("login"); })

const sunav = document.getElementById("signupnav")
sunav.addEventListener("click", function() { focusDiv("signup"); })


function focusDiv(id) {
    var actives = document.getElementsByTagName("div")
    var activesArr = Array.from(actives)
    var divs = document.getElementsByClassName("active");
    var divsArr = Array.from(divs)
    activeDivsArr = activesArr.filter(value => divsArr.includes(value));
    //var activeDivsArr = Array.from(activeDivs)
    activeDivsArr.forEach(function (currentdiv) {
        currentdiv.setAttribute("class", "hidden");
    })
    document.getElementById(id).setAttribute("class", "active");
}

const login = document.getElementById("loginForm")
login.addEventListener("submit", sendLogin)

async function sendLogin(event) {
    event.preventDefault();
    const formEvent = event.currentTarget
    try {
        const formData = new FormData(formEvent);
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJson = JSON.stringify(plainFormData);
        console.log(formDataJson)
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: formDataJson
        };
        const response = await fetch(window.location.origin+"/app/users/login/", options);
        const result = await response.json()
        if (result.status === "invalid") {
            const loginResult = document.getElementById('loginResultHeader')
            loginResult.setAttribute("class", "active")
            loginResult.innerHTML = "Login failed: username or password invalid. If you do not have an account, sign up."
        } else {
            document.getElementById("accountnav").setAttribute("class", "active");
            document.getElementById("login").setAttribute("class", "hidden");
            document.getElementById("loginnav").setAttribute("class", "hidden");
            document.getElementById("signupnav").setAttribute("class", "hidden");
            document.getElementById("home").setAttribute("class", "active");
            document.getElementById("accountUsername").innerHTML = plainFormData.username
            document.getElementById("accountEmail").innerHTML = result.email
            document.getElementById('loginResultHeader').setAttribute("class", "hidden")
        }
    } catch (error) {
        console.log(error);
    }
}

const signup = document.getElementById("signupForm")
signup.addEventListener("submit", sendSignup)

async function sendSignup(event) {
    event.preventDefault();
    const formEvent = event.currentTarget
    try {
        const formData = new FormData(formEvent);
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJson = JSON.stringify(plainFormData);
        console.log(formDataJson)
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: formDataJson
        };
        if(plainFormData.confirmpassword !== plainFormData.password){
            const passError = document.getElementById('signupResultHeader')
            passError.setAttribute("class", "active")
            passError.innerHTML = "Passwords do not match. Try again."
        } else {
            const response = await fetch(window.location.origin+"/app/users/signup/", options);
            const result = await response.json()
            if (result.emailstatus === "invalid") {
                const signupResult = document.getElementById('signupResultHeader')
                signupResult.setAttribute("class", "active")
                signupResult.innerHTML = "Email already associated with account. Try logging in."
            } else if (result.userstatus === "invalid") {
                const signupResult = document.getElementById('signupResultHeader')
                signupResult.setAttribute("class", "active")
                signupResult.innerHTML = "Username is already in use. Try another."
            } else {
                document.getElementById("accountnav").setAttribute("class", "active");
                document.getElementById("signup").setAttribute("class", "hidden");
                document.getElementById("signupnav").setAttribute("class", "hidden");
                document.getElementById("loginnav").setAttribute("class", "hidden");
                document.getElementById("home").setAttribute("class", "active");
                document.getElementById("accountUsername").innerHTML = plainFormData.username
                document.getElementById("accountEmail").innerHTML = plainFormData.email
                document.getElementById('signupResultHeader').setAttribute("class", "hidden");
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}

// sign up should add to userdb and add account details to account div, make sure username & email not in
// show account details should trigger when click account button
// delete account should react to button under account
// sign out button under account








const flip = document.getElementById("flip")
flip.addEventListener("click", flipCoin)

async function flipCoin() {
    const response = await fetch(window.location.origin + "/app/flip/")
    const result = await response.json();
    console.log(result);
    document.getElementById("coin").setAttribute("src", "assets/img/" + result.flip + ".png");
    document.getElementById("oneFlipResult").innerHTML = result.flip;
    document.getElementById("oneFlipResultHeader").setAttribute("class", "active");
}

const flips = document.getElementById("flips")
flips.addEventListener("submit", flipCoins)

async function flipCoins(event) {
    event.preventDefault();
    const formEvent = event.currentTarget
    try {
        const formData = new FormData(formEvent);
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJson = JSON.stringify(plainFormData);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: formDataJson
        };
        const response = await fetch(window.location.origin+"/app/flips/coins/", options);
        const result = await response.json()

        document.getElementById("flipsResults").setAttribute("class", "active");

        var resultsTable = document.getElementById('resultsTable');
        var tbodyRef = resultsTable.getElementsByTagName('tbody')[0];

        
        var headRow = tbodyRef.getElementsByTagName('tr')[1];
        headRow.getElementsByTagName('td')[1].innerHTML = result.summary.heads
        headRow.getElementsByTagName('td')[2].innerHTML = '';

        for(let i = 0; i<result.summary.heads; i++){
            var img = document.createElement("img");
            img.src = "assets/img/" + "heads" + ".png";
            img.class="bigcoin"
            img.style='width:'+String(100/result.summary.heads)+'%; white-space: pre-line;'
            headRow.getElementsByTagName('td')[2].append(img);
        }

        var tailRow = tbodyRef.getElementsByTagName('tr')[2];
        tailRow.getElementsByTagName('td')[1].innerHTML = result.summary.tails
        tailRow.getElementsByTagName('td')[2].innerHTML = '';

        for(let i = 0; i<result.summary.tails; i++){
            var img = document.createElement("img");
            img.src = "assets/img/" + "tails" + ".png";
            img.class="bigcoin"
            img.style='width:'+String(100/result.summary.tails)+'%; white-space: pre-line;'
            tailRow.getElementsByTagName('td')[2].append(img);
        }
        
        

        
    } catch (error) {
        console.log(error);
    }
}


const headsGuess = document.getElementById("headsGuess")
headsGuess.addEventListener("click", function() { guessFlip("heads"); })

const tailsGuess = document.getElementById("tailsGuess")
tailsGuess.addEventListener("click", function() { guessFlip("tails"); })

async function guessFlip(call) {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({"call": call})
        };
        const response = await fetch(window.location.origin+"/app/flip/call/", options);
        console.log(response)
        console.log(options)
        const result = await response.json()

        
    
        document.getElementById("coin2").setAttribute("src", "assets/img/" + result.flip + ".png");  

        document.getElementById("call").innerHTML = call
        document.getElementById("flipResult").innerHTML = result.flip
        document.getElementById("guessResult").innerHTML = "You " + result.result;
   
        
        document.getElementById("guessResultHeader").setAttribute("class", "active");
        document.getElementById("flipResultHeader").setAttribute("class", "active");
        document.getElementById("callHeader").setAttribute("class", "active");
        
    } catch (error) {
        console.log(error);
    }
}

