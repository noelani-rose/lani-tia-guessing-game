let totalGuesses = [];

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
}

function loadGuesses(){
  console.log('in loadGuesses');
  
  $.ajax({
    url: '/guess-game',
    method: 'GET',
  })
      .then((response)=>{
        console.log('in GET guesses');
        totalGuesses = response;

        render();
      })
  
}

function render(){
  console.log('in the render function');
  console.log(totalGuesses);
  $('#guessForm').empty();
  $('body').append(`<div>This is really hard</div>`);
}