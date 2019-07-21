var refreshButton = document.querySelector('.refresh');
var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');

refreshButton.addEventListener("click", (e) => console.log('refresh', e.target));
closeButton1.addEventListener("click", (e) => console.log('close1', e.target));
closeButton3.addEventListener("click", (e) => console.log('close2', e.target));
closeButton3.addEventListener("click", (e) => console.log('close3', e.target));