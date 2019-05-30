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
                    main.classList.remove("piecestype");
                    createPieces(data);

                    break;

                case "seriestype":
                    main.classList.remove("seriestype");
                    createSeries(data);

                    break;

                case "presstype":
                    console.log(type);
                    break;



                case "newstype":
                    console.log(type);
                    break;

            }
            // createHTML(data);
            console.log(data);
        }
    };

    request.send();
}

function createSeries(data) {

    if (!document.querySelector('.series').classList.contains('series-fetched')) {
        console.log(data);
        var template = document.querySelector(".seriesTemplate").content;
        for (i = 0; i < data.length; i++) {
            const clone = template.cloneNode(true);
            clone.querySelector('.series__box__src').src = data[i].cover_image.guid;
            clone.querySelector('.series__box__title').innerHTML = data[i].title.rendered;
            document.querySelector('.series').appendChild(clone);
            document.querySelector('.series').classList.add('series-fetched');
        }
    }



}

function createPieces(data) {
    if (document.querySelector(".commercial-button").checked) {
        console.log(data);
        if (!document.querySelector('.commercial').classList.contains('commercial-fetched')) {
            console.log(data);
            var template = document.querySelector(".seriesTemplate").content;
            for (i = 0; i < data.length; i++) {
                const clone = template.cloneNode(true);
                clone.querySelector('.series__box__src').src = data[i].image.guid;
                clone.querySelector('.series__box__title').innerHTML = data[i].title.rendered;


                document.querySelector('.commercial').appendChild(clone);
                document.querySelector('.commercial').classList.add('commercial-fetched');

            }
        }
    }

    if (document.querySelector(".personal-button").checked) {
        if (!document.querySelector('.personal').classList.contains('personal-fetched')) {
            console.log(data);
            var template2 = document.querySelector(".personalTemplate").content;
            for (i = 0; i < data.length; i++) {
                pLength = data.length;
                const clone = template2.cloneNode(true);
                clone.querySelector('.personal__box__src').src = data[i].image.guid;
                clone.querySelector('.personal__box').id = i + 1;
                clone.querySelector('.personal__box__title').innerHTML = data[i].title.rendered;
                document.querySelector('.personal').appendChild(clone);
                document.querySelector('.personal').classList.add('personal-fetched');
            }
            `}`
        }
    }
}









/// GALLERY

checkButtons();

function checkButtons() {
    if (document.querySelector(".personal-button").checked) {
        document.querySelector(".personal").classList.add('personal-active');
        document.querySelector(".series").classList.remove('series-active');
        document.querySelector(".commercial").classList.remove('commercial-active');
        main.classList.add("piecestype");
        FetchLocationTest();

    }
    if (document.querySelector(".series-button").checked) {
        document.querySelector(".series").classList.add('series-active');
        document.querySelector(".personal").classList.remove('personal-active');
        document.querySelector(".commercial").classList.remove('commercial-active');
        main.classList.add("seriestype");
        FetchLocationTest();

    }
    if (document.querySelector(".commercial-button").checked) {
        document.querySelector(".commercial").classList.add('commercial-active');
        document.querySelector(".personal").classList.remove('personal-active');
        document.querySelector(".series").classList.remove('series-active');
        main.classList.add("piecestype");
        FetchLocationTest();

    }
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

function openLightbox(e) {
    console.log(e);
    document.getElementById("myModal").style.visibility = "visible";
    document.getElementById("myModal").style.opacity = "1";
    slideIndex = e.id;
    showSlides(slideIndex);
}


/* document.querySelector(".image-lightbox-open").forEach(function (e) {
    e.addEventListener("click", function () {
        console.log('hha');

        document.getElementById("myModal").style.visibility = "visible";
        document.getElementById("myModal").style.opacity = "1";
        slideIndex = e.id;
        showSlides(slideIndex);

        console.log(document.getElementById(slideIndex).firstElementChild.outerHTML);
    })
}) */

function showSlides(n) {
    var image = document.getElementById(slideIndex).firstElementChild.firstElementChild.outerHTML;
    var title = document.getElementById(slideIndex).firstElementChild.nextElementSibling.innerHTML;
    /* var description = document.getElementById(slideIndex).firstElementChild.nextElementSibling
        .firstElementChild
        .nextElementSibling.nextElementSibling.innerHTML; */
    console.log(pLength);

    document.querySelector(".lightbox-image-box").firstElementChild.innerHTML = image;
    document.querySelector(".lightbox_text_title").innerHTML = title;
  //  document.querySelector(".lightbox_text_description").innerHTML = description;
    document.querySelector(".lightbox_text_number").innerHTML = (n + " / " + pLength);
    console.log(title);

}