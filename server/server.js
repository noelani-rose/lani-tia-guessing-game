console.log('in server.js');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let tiaGuesses = []
let laniguess = []



// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here


app.listen(PORT, () => {
  console.log ('We\'re LIVE!!! Server is running on port', PORT)
  console.log(getRanNumber());
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
