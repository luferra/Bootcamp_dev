var buttons = document.querySelectorAll(".drum");

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        playSound(this.innerHTML);
        buttonAnimation(this.innerHTML);
    });
}

document.addEventListener("keydown", function(event) {
    playSound(event.key);
    buttonAnimation(event.key)
;});

function playSound(key) {

    switch (key) {
        case "w":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;
        case "a":
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;
        case "s":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        case "d":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;
        case "j":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
        case "k":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;
        case "l":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
        default:
            break;
    }
}

function buttonAnimation(key){
    console.log(key);
    var qsClass = document.querySelector("."+key);
    console.log(qsClass);
    qsClass.classList.add("pressed");
    setTimeout(function () {
        qsClass.classList.remove("pressed");
    }, 1000);

}