$(document).ready(function() {
  console.log("Tweeter Ready");
  
  $('textarea').keyup(() => {
    let textLength = $('textarea').val().length;
    let counter = $('.counter');
    let textRemaining = 140 - textLength;

    counter.text(textRemaining);
    if (textRemaining < 0) {
      counter.css('color','red');
  } else {
    counter.css('color', $('body').css('color'));
  }
  });

  // $('textarea').blur(() => {
  //   console.log('blur')
  // });
  
  // $('textarea').keydown(() => {
  //   console.log('keypress')
  // });

  // $('textarea').change(() => {
  //   console.log('change')
  // });

  // $('textarea').input(() => {
  //   console.log('input')
  // });
});

