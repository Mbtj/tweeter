$(document).ready(function() {
  // Update number on tweet character counter 
  $('textarea').keyup(() => {
    let textLength = $('textarea').val().length;
    let counter = $('.counter');
    let textRemaining = 140 - textLength;

    // Change counter style for whether character limit is met
    counter.text(textRemaining);
    if (textRemaining < 0) {
      counter.css('color','red');
    } else {
      counter.css('color', $('body').css('color'));
    }
  });
});

