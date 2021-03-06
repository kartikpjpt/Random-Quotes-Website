const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader-circle');
let apiQuotes = [];

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden=true;
}
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //Check author known or unkown
    if(!authorText) {
        authorText.innerHTML = "Unknown";
    }
    else {
        authorText.innerHTML = quote.author;
    }
    //Check the quote length and Change size if it is large
    if(quote.text>50) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerHTML = quote.text;
    complete();
}
//fetch data
async function getQuote() {
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error) {
        // disError = "There is the following error " + error;
        // alert(disError);
    }
}
//tweet quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,"_blank");
}
//Event Listners
twitterBtn.addEventListener('click',tweetQuote);
newQuoteBtn.addEventListener('click',newQuote);
//On load


getQuote();

//FIREBASE 

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC8uC1uGF15kWaaFSn2yhvrhUlh7Jk3L50",
    authDomain: "random-quotes-site.firebaseapp.com",
    projectId: "random-quotes-site",
    storageBucket: "random-quotes-site.appspot.com",
    messagingSenderId: "245497052469",
    appId: "1:245497052469:web:a23e50c2418e577441e07c",
    measurementId: "G-JF52JZTYPE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
