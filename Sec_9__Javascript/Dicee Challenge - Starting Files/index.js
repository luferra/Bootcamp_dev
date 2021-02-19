var randomNumber1 = Math.floor((Math.random()*6)+1);
console.log(randomNumber1);
document.querySelector(".img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");
var randomNumber2 = Math.floor((Math.random()*6)+1);
console.log(randomNumber2);
document.querySelector(".img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");

var title = document.querySelector("h1");
console.log(title);
if (randomNumber1 > randomNumber2) {
    title.textContent = "Player 1 Wins!!";
}
else if (randomNumber1 < randomNumber2) {
    title.textContent = "Player 2 Wins!!";
}
if (randomNumber1 === randomNumber2) {
    title.textContent = "Draw!!";
}