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

responseStream.subscribe(res => console.log('First request from a stream', res));