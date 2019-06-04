var burger = document.querySelector('.bar__burger');
var bar = document.querySelector('.bar');
var bigLogo = document.querySelector('.bar__logo-big');
var smallLogo = document.querySelector('.bar__logo-small');
var main = document.querySelector('main');

/// CLOSE OPEN MENU EVEN OUTSIDE DIV

burger.addEventListener('click', function () {
    burger.classList.toggle('bar__burger-open');
    bar.classList.toggle('bar-open');
    if (bar.classList.contains('bar-open')){
        main.addEventListener('click', function(){
            burger.classList.remove('bar__burger-open');
            bar.classList.remove('bar-open');
        });
        }
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

function FetchLocationTest() {
    if (main.classList.contains('presstype') || main.classList.contains('piecestype') || main.classList.contains('seriestype') || main.classList.contains('newstype')) {
        let type = main.classList;

        let fetchLink = "http://viktorkacenak.com/MrKriss/wordpress/wp-json/wp/v2/" + type + "?_embed";
        console.log(fetchLink);
        JSONFetch(fetchLink, type);
    }
}

function JSONFetch(link, type) {

    var request = new XMLHttpRequest();
    request.open('GET', link, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);

            switch (type[0]) {
                case "piecestype":
                    console.log(type);
                    main.classList.remove("piecestype");
                    createPieces(data);
                    
                    break;

                case "seriestype":
                    createSeries(data);
                    main.classList.remove("seriestype");
                    break;

                case "presstype":
                    createPress(data);
                    break;



                case "newstype":
                    createNews(data);

                    break;

            }
            // createHTML(data);
            console.log(data);
        }
    };

    request.send();
}

function createSeries(data) {
    console.log(data);
    var template = document.querySelector(".seriesTemplate").content;
    for (i = 0; i < data.length; i++) {
        const clone = template.cloneNode(true);
        clone.querySelector('.series__box__src').src = data[i].cover_image.guid;
        clone.querySelector('.series__box__title').innerHTML = data[i].title.rendered;


        document.querySelector('.series').appendChild(clone);
    }
}

function createPress(data) {
    console.log(data);
    var template = document.querySelector(".pressTemplate").content;
    for (i = 0; i < data.length; i++) {
        const clone = template.cloneNode(true);
      clone.querySelector('.press__title').innerHTML = data[i].title.rendered;
      clone.querySelector('.press__source').innerHTML = 'By ' + data[i].source;

    
       document.querySelector('.press__list').appendChild(clone);

       if (data[i].featured == "1"){
          document.querySelector('.press-featured h3').innerHTML = data[i].title.rendered;
          document.querySelector('.press-featured h4').innerHTML = data[i].source;
          document.querySelector('.press-featured a').href = data[i].link;
       }
    }
}


function createNews(data) {
    console.log(data);
    var template = document.querySelector(".newsTemplate").content;
    for (i = 0; i < data.length; i++) {
        const clone = template.cloneNode(true);
      clone.querySelector('.news__article--heading h3').innerHTML = data[i].title.rendered;
      clone.querySelector('.news__article--image').src = data[i].image.guid;

    
       document.querySelector('.news__articles').appendChild(clone);

}
}



FetchLocationTest();









/// GALLERY
document.querySelector(".personal-button").addEventListener("click", showPersonal);
document.querySelector(".series-button").addEventListener("click", showSeries);
document.querySelector(".commercial-button").addEventListener("click", showCommercial);


function showPersonal() {
    document.querySelector(".personal").style.visibility = "visible";
    document.querySelector(".personal").style.opacity = "1";
    document.querySelector(".personal-button").classList.add('active');
    main.classList.add("piecestype");
    FetchLocationTest();
    hideSeries();
    hideCommercial();
}

function showSeries() {
    document.querySelector(".series").style.visibility = "visible";
    document.querySelector(".series").style.opacity = "1";
    document.querySelector(".series-button").classList.add('active');
    hidePersonal();
    hideCommercial();
    main.classList.add("seriestype");
    FetchLocationTest();

}

function showCommercial() {
    document.querySelector(".commercial").style.visibility = "visible";
    document.querySelector(".commercial").style.opacity = "1";
    document.querySelector(".commercial-button").classList.add('active');
    hidePersonal();
    hideSeries();
}

function hideSeries() {
    document.querySelector(".series").style.visibility = "hidden";
    document.querySelector(".series").style.opacity = "0";
    document.querySelector(".series-button").classList.remove('active');
}

function hidePersonal() {
    document.querySelector(".personal").style.visibility = "hidden";
    document.querySelector(".personal").style.opacity = "0";
    document.querySelector(".personal-button").classList.remove('active');
}

function hideCommercial() {
    document.querySelector(".commercial").style.visibility = "hidden";
    document.querySelector(".commercial").style.opacity = "0";
    document.querySelector(".commercial-button").classList.remove('active');
}

var slideIndex = 1;
var slides = document.getElementsByClassName("image-lightbox-open");
var n = 1;
var x = 0;


function toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
            document.getElementById("fullscreen").src = "img/exitFullscreen.png";
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            document.getElementById("fullscreen").src = "img/fullscreen.png";
        }
    }
}

function closeModal() {
    document.getElementById("myModal").style.visibility = "hidden";
    document.getElementById("myModal").style.opacity = "0";
}

function minusSlides() {
    x = slideIndex;
    if (x == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }
    showSlides(slideIndex);
}

function plusSlides() {
    x = slideIndex;
    if (x == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }
    showSlides(slideIndex);


}

document.querySelectorAll(".image-lightbox-open").forEach(function (e) {
    e.addEventListener("click", function () {
        document.getElementById("myModal").style.visibility = "visible";
        document.getElementById("myModal").style.opacity = "1";
        slideIndex = e.id;
        showSlides(slideIndex);

        console.log(document.getElementById(slideIndex).firstElementChild.outerHTML);
    })
})

function showSlides(n) {
    var image = document.getElementById(slideIndex).firstElementChild.outerHTML;
    var title = document.getElementById(slideIndex).firstElementChild.nextElementSibling.firstElementChild
        .innerHTML;
    var subtitle = document.getElementById(slideIndex).firstElementChild.nextElementSibling
        .firstElementChild
        .nextElementSibling.innerHTML;
    var description = document.getElementById(slideIndex).firstElementChild.nextElementSibling
        .firstElementChild
        .nextElementSibling.nextElementSibling.innerHTML;
    console.log(n);

    document.querySelector(".lightbox-image-box").firstElementChild.innerHTML = image;
    document.querySelector(".lightbox_text_title").innerHTML = title;
    document.querySelector(".lightbox_text_subtitle").innerHTML = subtitle;
    document.querySelector(".lightbox_text_description").innerHTML = description;
    document.querySelector(".lightbox_text_number").innerHTML = (n + " / " + slides.length);
    console.log(title);

}