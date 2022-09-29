let individualGuesses = [];

$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  
  $('.submit').on('click', onSubmit);
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
    
  })

  .catch((err)=>{
    console.log('POST player guesses error');
  })

  render();
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
  for(let player of individualGuesses){
    $('#guessList').append(`<br><li>${player.player1}</li>`);
    // <li>${player.player2}</li>`);
    // console.log(player.player1)
  }

  for (let otherPlayer of individualGuesses){
    $('#guessList2').append(`<br>
    <li>${otherPlayer.player2}</li>`);
  }

}