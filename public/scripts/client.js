/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {

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
}

const $button = $('#send-tweet');

$button.submit((event) => {
  event.preventDefault();
  let $textInput = $('#tweet-text');
  const tweetText = $button.serialize();
  
  if ($textInput.val().length > 0 && $textInput.val().length <= 140) {
    $.post('/tweets', tweetText, () => {
      console.log(tweetText);
       loadTweets(true);
    });
  } else {
    alert('Invalid tweet length');
  }

});

const loadTweets = function(newTweet = false) {
  $.get('/tweets', (data) => {
    if (newTweet) {
      renderTweets([data[data.length - 1]]);
    } else {
      renderTweets(data);
    }
  })
}
loadTweets();