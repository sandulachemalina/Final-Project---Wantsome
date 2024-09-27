let imageSlides = document.getElementsByClassName('slide');
let circles = document.getElementsByClassName('circle');
let counter = 0;

function hideImages() {
    for (let i = 0; i < imageSlides.length; i++) {
        imageSlides[i].classList.remove('visible');
    }
}

function removeDots() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].classList.remove('dot');
    }
}

function showImage(index) {
    if (index < imageSlides.length && index < circles.length) {
        hideImages();
        removeDots();
        imageSlides[index].classList.add('visible');
        circles[index].classList.add('dot');
    }
}

function slideshow() {
    if (counter >= imageSlides.length) {
        counter = 0;
    }
    showImage(counter);
    counter++;
}

hideImages();
removeDots();
showImage(counter);

setTimeout(slideshow, 1000);
setInterval(slideshow, 5000);

