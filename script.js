var refreshButton = document.querySelector('.refresh');
var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');

var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click').throttleTime(1000);
var close1Clicks = Rx.Observable.fromEvent(closeButton1, 'click');
var close2Clicks = Rx.Observable.fromEvent(closeButton2, 'click');
var close3Clicks = Rx.Observable.fromEvent(closeButton3, 'click');

var startupRequestStream = Rx.Observable.of('https://api.github.com/users');

var responseStream = startupRequestStream
  .flatMap(requestUrl =>
    Rx.Observable.fromPromise(fetch(requestUrl).then(response => response.json()))
  );

responseStream.subscribe(listUsers => {
    var suggestedUser = listUsers[Math.floor(Math.random()*listUsers.length)];
    renderSuggestion(suggestedUser, '.suggestion1');
});

responseStream.subscribe(listUsers => {
    var suggestedUser = listUsers[Math.floor(Math.random()*listUsers.length)];
    renderSuggestion(suggestedUser, '.suggestion2');
});

responseStream.subscribe(listUsers => {
    var suggestedUser = listUsers[Math.floor(Math.random()*listUsers.length)];
    renderSuggestion(suggestedUser, '.suggestion3');
});

// Rendering Funtion ---------------------

function renderSuggestion(suggestedUser, selector) {
  var suggestionEl = document.querySelector(selector);
  var usernameEl = suggestionEl.querySelector('.username');
  usernameEl.href = suggestedUser.html_url;
  usernameEl.textContent = suggestedUser.login;
  var imgEl = suggestionEl.querySelector('img');
  imgEl.src = "";
  imgEl.src = suggestedUser.avatar_url;
}