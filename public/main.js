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


function focusDiv(id) {
    var activeDivs = document.getElementsByClassName("active");
    var activeDivsArr = Array.from(activeDivs)
    activeDivsArr.forEach(function (currentdiv) {
        currentdiv.setAttribute("class", "hidden");
    })
    document.getElementById(id).setAttribute("class", "active");
}

const flip = document.getElementById("flip")
flip.addEventListener("click", flipCoin)

async function flipCoin() {
    const response = await fetch(window.location.origin + "/app/flip/")
    const result = await response.json();
    console.log(result);
    document.getElementById("oneFlipResult").innerHTML = result.flip;
    document.getElementById("coin").setAttribute("src", "assets/img/" + result.flip + ".png");
    document.getElementById("oneFlipResultHeader").hidden=false;
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

        

        document.getElementById("call").innerHTML = call
        document.getElementById("flipResult").innerHTML = result.flip
        document.getElementById("guessResult").innerHTML = "You " + result.result;
   

        document.getElementById("coin2").setAttribute("src", "assets/img/" + result.flip + ".png");  
        
        document.getElementById("guessResultHeader").hidden=false;
        document.getElementById("flipResultHeader").hidden=false;
        document.getElementById("callHeader").hidden=false;
        
    } catch (error) {
        console.log(error);
    }
}

