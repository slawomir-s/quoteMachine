$(function () {
    var prefix = "https://cors-anywhere.herokuapp.com/",
        tweetLink = "https://twitter.com/intent/tweet?text=",
        quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
    
    function getQuote() {
        $.getJSON(prefix + quoteUrl, createTweet);
        $.ajaxSetup({
            cache: false
        });
    }

    function createTweet(input) {
        if (!(input && input.length)) {
            alert('There is no such object');
        return;    
        }
     
            var data = input[0],
                quoteText = $(data.content).text().trim(),
                quoteAuthor = data.title;
            if (!quoteAuthor.length) {
                quoteAuthor = "Unknown author";
            }
            
            var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
            if (tweetText.length > 140) {
                getQuote();
            } else {
                var tweet = tweetLink + encodeURIComponent(tweetText);
                $('.quote').text('" '+ quoteText +'  "');
                $('.author').text("- " + quoteAuthor);
                $('.tweet').attr('href', tweet);
            }
    }
    getQuote();
    $('.trigger').click(function () {
        getQuote();
    });
});