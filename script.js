var refreshButton = document.querySelector('.refresh');
var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');

var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click').throttleTime(1000);
var close1Clicks = Rx.Observable.fromEvent(closeButton1, 'click');
var close2Clicks = Rx.Observable.fromEvent(closeButton2, 'click');
var close3Clicks = Rx.Observable.fromEvent(closeButton3, 'click');

var startupRequestStream = Rx.Observable.of('https://api.github.com/users');

var requestOnRefreshStream = refreshClickStream
    .map(ev => {
        var randomOffset = Math.floor(Math.random()*500);
        return 'https://api.github.com/users?since=' + randomOffset;
    });

var requestStream = startupRequestStream.merge(requestOnRefreshStream); 

var responseStream = requestStream
    .flatMap(requestUrl =>
        Rx.Observable.fromPromise(fetch(requestUrl).then(response => response.json()))
    ).publishReplay().refCount(1);

function createSuggestionStream(responseStream, closeClickStream){
    return responseStream
        .map(listUsers => getRandomUser(listUsers))
        .startWith(null)
        .merge(refreshClickStream.map(ev => null))
        .merge(closeClickStream.withLatestFrom(responseStream, (ev, listUsers) => getRandomUser(listUsers)) );
}

var suggestionStream1 = createSuggestionStream(responseStream, close1Clicks);
var suggestionStream2 = createSuggestionStream(responseStream, close2Clicks);
var suggestionStream3 = createSuggestionStream(responseStream, close3Clicks);

suggestionStream1.subscribe({
    next: user => {
        console.log('next1');
        renderSuggestion(user, '.suggestion1');
    },
    error: err => console.log('error1'),
    complete: () => console.log('complete1')
});

suggestionStream2.subscribe({
    next: user => {
        console.log('next2');
        renderSuggestion(user, '.suggestion2');
    },
    error: err => console.log('error2'),
    complete: () => console.log('complete2')
});

suggestionStream3.subscribe({
    next: user => {
        console.log('next3');
        renderSuggestion(user, '.suggestion3');
    },
    error: err => console.log('error3'),
    complete: () => console.log('complete3')
});

// Rendering Funtion ---------------------

function renderSuggestion(suggestedUser, selector) {
    var suggestionEl = document.querySelector(selector);
      if (suggestedUser === null) {
        suggestionEl.style.visibility = 'hidden';
      } else {
        suggestionEl.style.visibility = 'visible';
        var usernameEl = suggestionEl.querySelector('.username');
        usernameEl.href = suggestedUser.html_url;
        usernameEl.textContent = suggestedUser.login;
        var imgEl = suggestionEl.querySelector('img');
        imgEl.src = "";
        imgEl.src = suggestedUser.avatar_url;
    }
}

function getRandomUser(listUsers) {
    return listUsers[Math.floor(Math.random()*listUsers.length)];
}