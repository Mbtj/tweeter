/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}

const createTweetElement = function(tweet) {
let $tweet = $(`
<article class="tweet">
  <header>
    <span>
      <img src="${tweet.user.avatars}"><h4>${tweet.user.name}</h4>
    </span>
    <div class="tweet-handle">
      ${tweet.user.handle}
    </div>
  </header>
  <h3>
    ${tweet.content.text}
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
}

const $button = $('#send-tweet');

$button.submit((event) => {
  alert('it works');
  event.preventDefault();
  let $textInput = $('#tweet-text');
  const tweetText = $button.serialize();
  
  if ($textInput.val().length > 0 && $textInput.val().length <= 140) {
    $.post('/tweets', tweetText, () => {
      console.log(tweetText);
    });
  } else {
    alert('Invalid tweet length');
  }

});


const loadTweets = function() {
  $.get('/tweets', (data) => {
    renderTweets(data);
  })
}
loadTweets(data);