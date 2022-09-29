console.log('in server.js');
const express = require('express');
const bodyParser = require('body-parser');
const { get } = require('jquery');
const app = express();
const PORT = 5000;

let playerGuesses = [];



// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here


app.listen(PORT, () => {
  console.log ('We\'re LIVE!!! Server is running on port', PORT)
  console.log(getRanNumber());
})

app.get('/guess-game', (req, res)=>{
  console.log('guess-game GET playerguesses', playerGuesses);

  res.send(playerGuesses);
})

app.post('/guess-game', (req, res)=> {
  console.log('in POST guess-game', )
  
  let newPlayerGuesses = req.body;

  playerGuesses.push(newPlayerGuesses);

  res.sendStatus(201);
})

app.get('/guess-game', (req, res)=>{
   console.log('in guess-game GET random number');
  let randoNumber = getRanNumber()
   res.send(randoNumber);
})

function getRanNumber (){
  let ranNum = Math.floor(Math.random() * 25) + 1;
  // if ($(this) === currentGuess){
  //   alert('YOU ROCK!!!')
  // }
  // else if ($(this) > currentGuess){
  //   alrert('you\'re sooooo high')
  // }
  // else ($(this) < currentGuess){
  //   alert('too slow and too low')
  // };
  return ranNum;

}

