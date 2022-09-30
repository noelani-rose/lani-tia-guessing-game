

$(document).ready(handleReady);


let individualGuesses = [];
let playerOneResults = [];
let playerTwoResults = [];



function handleReady() {
  console.log("jquery is loaded!")
  
  $('.submit').on('click', onSubmit);
  render();
}

function onSubmit(evt){
  evt.preventDefault();
  console.log('in onSubmit');


  let guessSubmission = {
    player1: $('#tiaGuess').val(),
    player2: $('#laniGuess').val()
  };

  console.log(guessSubmission);


  $.ajax({
    url: '/guess-game',
    method: 'POST',
    data: guessSubmission 
  })

  .then((response)=>{
    console.log('POST playerGuesses', response);

    loadGuesses();
    render();

    
  })

  .catch((err)=>{
    console.log('POST player guesses error');
  })

  receiveGuessResultsPlayerOne();
  receiveGuessResultsPlayerTwo();
}




function receiveGuessResultsPlayerOne(){
  render();
  console.log('in receiveGuessResults function player');
  $.ajax({
    url: '/guess-game-results-p1',
    method: 'GET'
  })

    .then((response) =>{
      console.log('in receive Guess Results', response);

      // pushing instead of just updating so it's always
      // taking in new variables!!!
      playerOneResults.push(response);
    })

    .catch((err)=>{
      console.log('GET guess results error');
    })

    
}

function receiveGuessResultsPlayerTwo(){
  render();
  console.log('in receiveGuessResults function player 2');
  $.ajax({
    url: '/guess-game-results-p2',
    method: 'GET'
  })

    .then((response) =>{
      console.log('in receive Guess Results for Player 2', response);

      playerTwoResults.push(response);
    })

    .catch((err)=>{
      console.log('GET guess results error');
    })

}





function loadGuesses(){
  console.log('in loadGuesses');
  
  $.ajax({
    url: '/guess-game',
    method: 'GET',
  })
      .then((response)=>{
        console.log('in GET guesses');
        individualGuesses = response;


        render();
      })
  
}









let guessCounter = 1;
function render(){
  console.log('in the render function');
  console.log(individualGuesses);
  $('#guessList').empty();
  $('#guessList2').empty();
  $('.totalGuesses').text(`Total guesses: ${guessCounter++}`)
  // changed to regular for loop
  // to access individual elements 
  for(let i = 0; i < individualGuesses.length; i++){
    $('#guessList').append(`<br><li>${individualGuesses[i].player1} - ${playerOneResults[i]}</li>`);
    
  }
  for (let i = 0; i < individualGuesses.length; i++){
    $('#guessList2').append(`<br>
    <li>${individualGuesses[i].player2} - ${playerTwoResults[i]}</li>`);
  }



}