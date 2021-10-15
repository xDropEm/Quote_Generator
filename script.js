
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");
const body = document.querySelector("body");

let apiQuotes = [];

// functions to hide and show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Random quote function
function newQuote() {
    loading();
    // dynamically changing background image
    body.setAttribute("style", "background-image: url('https://source.unsplash.com/1600x900/?backgrounds,cool'); background-size: cover;");
    // Array indexing for generating random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quoteText.textContent = quote.text;
    // To replace null value with "Unknown"
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    // Adding css class for long quotes
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl); 
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
	alert("Opps! you encountere an error");
    }
}

// Adding quote to twitter
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,"_blank");
}

// Event listener to generate new quotes
newQuoteBtn.addEventListener("click", newQuote);

// Event listener to tweet on twitter
twitterBtn.addEventListener("click",tweetQuote);

getQuotes();
