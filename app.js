const quoteContainer = document.getElementById("quote--container");
const quoteText = document.getElementById("quote--span");
const quoteAuthor = document.getElementById("quote--author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("newQuote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
//Show New Quote

function newQuote() {
  loading();
  //Pick a Random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Replace null author field with unknown
  !quote.author
    ? (quoteAuthor.textContent = "Unknown")
    : (quoteAuthor.textContent = quote.author);

  //Change Font Size Depending on Quote length

  quote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  //Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}
// Get Quotes from API

async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch Error
  }
}

//Tweet a Quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}`;
  window.open(twitterUrl, "_blank");
}

//Event Listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
//On Load
getQuotes();
