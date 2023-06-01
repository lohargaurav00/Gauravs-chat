let image = document.getElementById("logo");

image.addEventListener("mouseover", function run() {
    image.src = "extra/logo.gif";
});

image.addEventListener("mouseout", function run() {
    image.src = "extra/static_logo.png";
});