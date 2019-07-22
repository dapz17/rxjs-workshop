var refreshButton = document.querySelector('.refresh');
var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');

var refreshClicks = Rx.Observable.fromEvent(refreshButton, 'click');
var close1Clicks = Rx.Observable.fromEvent(closeButton1, 'click');
var close2Clicks = Rx.Observable.fromEvent(closeButton2, 'click');
var close3Clicks = Rx.Observable.fromEvent(closeButton3, 'click');

refreshClicks.subscribe(() => console.log('Refresh'));
close1Clicks.subscribe(() => console.log('click1'));
close2Clicks.subscribe(() => console.log('click2'));
close3Clicks.subscribe(() => console.log('click3'));