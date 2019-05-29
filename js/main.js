var burger = document.querySelector('.bar__burger');
var bar = document.querySelector('.bar');
var bigLogo = document.querySelector('.bar__logo-big');
var smallLogo = document.querySelector('.bar__logo-small');
var main = document.querySelector('main');

burger.addEventListener('click', function () {
    burger.classList.toggle('bar__burger-open');
    bar.classList.toggle('bar-open');

});


// SCROLL STUFF 
function ScrollPlease(x) {
    if (x.matches) { // If media query matches
        window.onscroll = () => {
            if (this.scrollY <= 10) {
                bar.classList.remove('scrolled');

            } else {
                bar.classList.add('scrolled');
            }

        };
    }
}
var x = window.matchMedia("(max-width: 700px)")
ScrollPlease(x) // Call listener function at run time
x.addListener(ScrollPlease);

/// FETCHING STUFF

if (main.classList.contains('presstype') || main.classList.contains('piecestype') || main.classList.contains('seriestype') || main.classList.contains('newstype')) {
    let type = main.classList;

    let fetchLink = "http://viktorkacenak.com/MrKriss/wordpress/wp-json/wp/v2/" + type + "?_embed";
    console.log(fetchLink);
    JSONFetch(fetchLink, type);
}

function JSONFetch(link, type) {

    var request = new XMLHttpRequest();
    request.open('GET', link, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
            switch (type) {
                case 'piecestype':
                    console.log(type);
                    
                    break;

                case 'seriestype':
                    console.log(type);
                    break;

                case 'presstype':
                    console.log(type);
                    break;



                case 'newstype':
                    console.log(type);
                    break;

            }
            // createHTML(data);
            console.log(data);
        }
    };

    request.send();
}
