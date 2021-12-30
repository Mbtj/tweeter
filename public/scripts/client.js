/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Create content for #tweetc container
const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};


// helper function for createTWeet Element
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// Creates Element for a tweet in HTML
const createTweetElement = function(tweet) {

  // XSS safe text
  const safeAvatar = `${escape(tweet.user.avatars)}`;
  const safeName = `${escape(tweet.user.name)}`;
  const safeHandle = `${escape(tweet.user.handle)}`;
  const safeTweet = `${escape(tweet.content.text)}`;


  const $tweet = $(`
  <article class="tweet">
    <header>
      <span>
        <img src="${safeAvatar}"><h4>${safeName}</h4>
      </span>
      <div class="tweet-handle">
        ${safeHandle}
      </div>
    </header>
    <h3>
      ${safeTweet}
    </h3>
    <footer>
      <span>
        ${timeago.format(tweet.created_at)}
      </span>
      <aside class="tweet-buttons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
        </aside>
        </footer>
        </article>
        `);
        
  return $tweet;
};

// fetch tweets from the database
const loadTweets = function(newTweet = false) {
  $.get('/tweets', (data) => {
    if (newTweet) {
      renderTweets([data[data.length - 1]]);
    } else {
      renderTweets(data);
    }
  });
};


// Webpage functionality
$(document).ready(function() {      
  const $button = $('#send-tweet');
        
  $button.submit((event) => {
    event.preventDefault();
    let $textInput = $('#tweet-text');
    const tweetText = $button.serialize();
          
    if ($textInput.val().length <= 0) {
      $('#tweet-error').text('You cannot send an empty tweet');
      $('#tweet-error').prepend('<i class="fa-solid fa-triangle-exclamation"></i>');
      $('#tweet-error').append('<i class="fa-solid fa-triangle-exclamation"></i>');


      // Delay to allow text to render
      setTimeout(() => {
        $('#tweet-error').slideDown();
      }, 50);

    } else if ($textInput.val().length > 140) {
      $('#tweet-error').text(`Tweet is too long!`);
      $('#tweet-error').prepend('<i class="fa-solid fa-triangle-exclamation"></i>');
      $('#tweet-error').append('<i class="fa-solid fa-triangle-exclamation"></i>');

      // Delay to allow transition to animate
      setTimeout(() => {
        $('#tweet-error').slideDown();
      }, 50);
    } else {
      // Clear Any Error messages on screen
      $('#tweet-error').slideUp();
      
      // Add most recent tweet
      $.post('/tweets', tweetText, () => {
        console.log(tweetText);
        loadTweets(true); // prepends single tweet
      });
    }
  });
          
  loadTweets();
});