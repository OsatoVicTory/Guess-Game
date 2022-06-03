var fs = require('fs');
var ask = require('readline-sync');
var username = ask.question("What is your name ? ");
var object = {
    username: username,
    limit: 1,
    points: 0
}
fs.writeFileSync("./cookie.json", JSON.stringify(object), err => {
    if(err) console.log('Error updating changes', err);
})
startGame();
function startGame() {
    var continueGame = true;
    while(continueGame == true) {
        var data = fs.readFileSync("cookie.json");
        var { username, limit, points } = JSON.parse(data);
        guessGame(username, limit, points);
        continueGame = canContinue();
        
        function canContinue() {
            var confirm = ask.question("Do you want to continue game ? Y/N ")
            return confirm == 'Y';     
        }
        
        function guessGame(username, limit, points) {
            var guess = Math.floor(Math.random() * (limit - 0 + 1) + 0);
            var userGuess = ask.question(`Guess a number from 0 - ${limit} : `);
            if(userGuess == guess) {
                var update = {
                    username: username,
                    limit: limit+1,
                    points: points+1
                }
                fs.writeFileSync("cookie.json", JSON.stringify(update))
                console.log(`Great Job ${username}, You now have ${points+1} points`);                
                
            } else {
                var update = {
                    username: username,
                    limit: 1,
                    points: 0
                }
                fs.writeFileSync("cookie.json", JSON.stringify(update))
                console.log(`Ouch sorry back to level 1`);
                
                
            }  
        }
    }
}
