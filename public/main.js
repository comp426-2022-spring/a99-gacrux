const hnav = document.getElementById("homenav")
hnav.addEventListener("click", function() { focusDiv("home"); })

const snav = document.getElementById("addnav")
snav.addEventListener("click", function() { focusDiv("addHealth"); })

const linav = document.getElementById("loginnav")
linav.addEventListener("click", function() { focusDiv("login"); })

const sunav = document.getElementById("signupnav")
sunav.addEventListener("click", function() { focusDiv("signup"); })

const anav = document.getElementById("accountnav")
anav.addEventListener("click", function() { focusDiv("account"); })

const rnav = document.getElementById("resourcenav")
rnav.addEventListener("click", function() { focusDiv("resources"); })

function focusDiv(id) {
    var actives = document.getElementsByTagName("div")
    var activesArr = Array.from(actives)
    var divs = document.getElementsByClassName("active");
    var divsArr = Array.from(divs)
    activeDivsArr = activesArr.filter(value => divsArr.includes(value));
    activeDivsArr.forEach(function (currentdiv) {
        currentdiv.setAttribute("class", "hidden");
    })
    
    document.getElementById(id).setAttribute("class", "active");
    // document.getElementsById("loginForm").reset();
    
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
            document.getElementById('loginResultHeader').innerHTML = ""
            document.getElementById('signupResultHeader').setAttribute("class", "hidden");
            document.getElementById('signupResultHeader').innerHTML = ""
            document.getElementById("addForm").setAttribute("class", "active");
            document.getElementById('addResultHeader').setAttribute("class", "hidden");
            document.getElementById('addResultHeader').innerHTML = ""
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
                document.getElementById('signupResultHeader').innerHTML = ""
                document.getElementById('loginResultHeader').setAttribute("class", "hidden")
                document.getElementById('loginResultHeader').innerHTML = ""
                document.getElementById("addForm").setAttribute("class", "active");
                document.getElementById('addResultHeader').setAttribute("class", "hidden");


            }
        }
        
    } catch (error) {
        console.log(error);
    }
}


const signout = document.getElementById("signOut")
signout.addEventListener("click", function() { signOut(); })

function signOut() {
    document.getElementById("accountnav").setAttribute("class", "hidden");
    document.getElementById("account").setAttribute("class", "hidden");
    document.getElementById("accountUsername").innerHTML = ""
    document.getElementById("accountEmail").innerHTML = ""
    document.getElementById("signupnav").setAttribute("class", "active");
    document.getElementById("loginnav").setAttribute("class", "active");
    document.getElementById("home").setAttribute("class", "active");
    document.getElementById("addForm").setAttribute("class", "hidden");
    document.getElementById('addResultHeader').setAttribute("class", "active");
    document.getElementById('addResultHeader').innerHTML = "Login or sign up to add health info."
    document.getElementById("seeResultHeader").setAttribute("class", "hidden")
    document.getElementById("seelist").setAttribute("class", "hidden")
    document.getElementById("seeHeader").setAttribute("class", "hidden")
}

const deleteAcc = document.getElementById("deleteAccount")
deleteAcc.addEventListener("click", function() { deleteAccount(); })

async function deleteAccount() {
    try {
        var username = document.getElementById("accountUsername").innerText
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({"username": username})
        };
        console.log(username)
        const response = await fetch(window.location.origin+"/app/users/delete/", options);

        //const result = await response.json()

        document.getElementById("accountnav").setAttribute("class", "hidden");
        document.getElementById("account").setAttribute("class", "hidden");
        document.getElementById("accountUsername").innerHTML = ""
        document.getElementById("accountEmail").innerHTML = ""
        document.getElementById("signupnav").setAttribute("class", "active");
        document.getElementById("loginnav").setAttribute("class", "active");
        document.getElementById("home").setAttribute("class", "active");
        document.getElementById("addForm").setAttribute("class", "active");
        document.getElementById("addForm").setAttribute("class", "hidden");
        document.getElementById('addResultHeader').setAttribute("class", "active");
        document.getElementById('addResultHeader').innerHTML = "Login or sign up to add health info."
        
    } catch (error) {
        console.log(error);
    }
}


// delete account should react to button under account


const addlisten = document.getElementById("addForm")
addlisten.addEventListener("submit", addHealth)

async function addHealth(event) {
    event.preventDefault();
    const formEvent = event.currentTarget
    try {
        const formData = new FormData(formEvent);
        const plainFormData = Object.fromEntries(formData.entries());
        plainFormData.username = document.getElementById("accountUsername").innerText;
        const formDataJson = JSON.stringify(plainFormData);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: formDataJson, 
        };
        const response = await fetch(window.location.origin+"/app/users/addhealth/", options);
        const result = await response.json()

        document.getElementById("addResultHeader").setAttribute("class", "active");
        document.getElementById("addResultHeader").innerHTML = result.status
    } catch (error) {
        console.log(error);
    }
}


const seelisten1 = document.getElementById("addnav")
seelisten1.addEventListener("click", seeHealth)

const seelisten2 = document.getElementById("addForm")
seelisten2.addEventListener("submit", seeHealth)

async function seeHealth() {
    if (document.getElementById("addForm").className === "active") {
        document.getElementById("seelist").setAttribute("class", "hidden")
        const username = document.getElementById("accountUsername").innerText
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({"username": username})
        };
        const response = await fetch(window.location.origin + "/app/users/seehealth/", options)
        const result = await response.json();
        document.getElementById("seeHeader").setAttribute("class", "active")
        if (result.status === "invalid"){
            document.getElementById("seeResultHeader").innerHTML = "There is no data assosiated with your username. Add info above."
            document.getElementById("seeResultHeader").setAttribute("class", "active")
        } else {
            document.getElementById("agelist").innerHTML = result.age
            document.getElementById("heightlist").innerHTML = result.height
            document.getElementById("weightlist").innerHTML = result.weight
            document.getElementById("bplist").innerHTML = result.bloodPressure
            document.getElementById("bfilist").innerHTML = result.bfi
            document.getElementById("moodlist").innerHTML = result.mood
            document.getElementById("stresslist").innerHTML = result.stress
            document.getElementById("exerciselist").innerHTML = result.exercise
            document.getElementById("sleeplist").innerHTML = result.sleep
            document.getElementById("goalslist").innerHTML = result.goals
            document.getElementById("seelist").setAttribute("class", "active")
            document.getElementById("seeResultHeader").setAttribute("class", "hidden")
        }
    }

}

/*
var button = document.getElementById("resourcesPage");

button.addEventListener("click", function(){
    document.getElementById("seeResources").className === "active"
    fetch(window.location.origin + "/app/users/seeResources/", options)
});*/

