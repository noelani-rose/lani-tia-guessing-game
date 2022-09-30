console.log('in server.js');
const express = require('express');
const bodyParser = require('body-parser');
const { get } = require('jquery');
const app = express();
const PORT = 5000;

let playerGuesses = [];
let theRandomNumber;





app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('server/public'));



app.listen(PORT, () => {
  console.log ('We\'re LIVE!!! Server is running on port', PORT)
  console.log(getRanNumber());
  console.log('here is the random number', theRandomNumber);
})



app.post('/guess-game', (req, res)=> {
  console.log('in POST guess-game', playerGuesses )
  
  let newPlayerGuesses = req.body;

  playerGuesses.push(newPlayerGuesses);

  res.sendStatus(201);
})



app.get('/guess-game', (req, res)=>{


  res.send(playerGuesses);
})

app.get('/guess-game-results-p1', (req, res)=>{
  console.log('in guess-game GET random number');

  let guessResults = {
    tooHigh: 'Your guess is too high',
    tooLow: 'Your guess is too low',
    rightGuess: 'You\'re spot on!!!'
};


// got rid of for-loop
// named varaible to convert to most recent player guess to number of player 1 
   let playGuessAsNumberPlayer1 = Number(playerGuesses[playerGuesses.length -1].player1);
   // 
    if (theRandomNumber === playGuessAsNumberPlayer1){
      console.log('you\'re on the right track!');
      res.send(guessResults.rightGuess)
    }
    else if (theRandomNumber > playGuessAsNumberPlayer1) {
        console.log('too low');
        res.send(guessResults.tooLow)
      } else if (theRandomNumber < playGuessAsNumberPlayer1)
        console.log('too high');
        res.send(guessResults.tooHigh);

  }
);

  app.get('/guess-game-results-p2', (req, res)=>{
    console.log('in guess-game GET random number');
  
    let guessResults = {
      tooHigh: 'Your guess is too high',
      tooLow: 'Your guess is too low',
      rightGuess: 'You\'re spot on!!!'
  };

  
  
   // for (let i = 0; i < playerGuesses.length; i++){
    let playGuessAsNumberPlayer2 = Number(playerGuesses[playerGuesses.length-1].player2)
     // playerGuesses[i].player2 = Number(playerGuesses[i].player2);
      if (theRandomNumber === playGuessAsNumberPlayer2){
        console.log('you\'re on the right track!');
        res.send(guessResults.rightGuess)
      }
      else if (theRandomNumber > playGuessAsNumberPlayer2) {
          console.log('too low');
          res.send(guessResults.tooLow)
        } else if (theRandomNumber < playGuessAsNumberPlayer2)
          console.log('too high');
          res.send(guessResults.tooHigh);
      });





app.post('/guess-game', (req, res)=> {
  console.log('in POST guess-game', playerGuesses )
  
  let newPlayerGuesses = req.body;

  playerGuesses.push(newPlayerGuesses);

  res.sendStatus(201);
})



function getRanNumber (){
  let ranNum = Math.floor(Math.random() * 25) + 1;
  theRandomNumber = ranNum;
  console.log('here are the player guesses', playerGuesses);
  return theRandomNumber;

}

