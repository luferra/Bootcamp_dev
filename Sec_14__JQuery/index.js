$("h1").text("good bye");

console.log($("a").attr("href"));
$("a").attr("href", "https://luferra.it")
console.log($("a").attr("href"));

$("h1").click(function () {
    $("h1").css("color", "yellow");
})

$("document").keydown(function (e) { 
    $("h1").text(e.key);
})

$("h1").on("mouseover", function () {
    $("h1").text("stronzo");
});

$("button").on("click", function (e) {
    console.log(e);
    console.log( $( this ).text() );
});