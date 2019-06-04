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

        let fetchLink = "http://viktorkacenak.com/MrKriss/wordpress/wp-json/wp/v2/" + type + "?per_page=15&_embed";
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

/// GALLERY
var c = 0;
var p = 0;
var modal = document.getElementById("myModal");
var image = 0;
var title = 0;
var number = 0;
var numberE = 0;
var personalData = [];
var commercialData = [];
var actualNumber = 0;
var haha = 0;

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
            var template = document.querySelector(".commercialTemplate").content;
            for (i = 0; i < data.length; i++) {
                if (data[i].categories[0] == 3) {
                    const clone = template.cloneNode(true);
                    commercialData[c] = data[i];
                    c++;
                    console.log(c);
                    clone.querySelector('.series__box__src').src = data[i].image.guid;
                    clone.querySelector('.series__box__title').innerHTML = data[i].title.rendered;
                    clone.querySelector('.commercial__box').id = data[i].id;
                    clone.querySelector('.commercial__box__number').innerHTML = c;

                    document.querySelector('.commercial').appendChild(clone);
                    document.querySelector('.commercial').classList.add('commercial-fetched');
                }

            }
        }
    }


    if (document.querySelector(".personal-button").checked) {
        if (!document.querySelector('.personal').classList.contains('personal-fetched')) {
            console.log(data);
            var template2 = document.querySelector(".personalTemplate").content;
            for (i = 0; i < data.length; i++) {
                if (data[i].categories[0] == 2) {
                    const clone = template2.cloneNode(true);
                    personalData[p] = data[i];
                    p++;
                    clone.querySelector('.personal__box__src').src = data[i].image.guid;
                    clone.querySelector('.personal__box').id = data[i].id;
                    clone.querySelector('.personal__box__title').innerHTML = data[i].title.rendered;
                    clone.querySelector('.personal__box__number').innerHTML = p;

                    document.querySelector('.personal').appendChild(clone);
                    document.querySelector('.personal').classList.add('personal-fetched');


                }
            }





        }
    }
    /* console.log(personalData[4]); */
}


    checkButtons();



function checkButtons() {
    document.querySelector(".personal").classList.remove('personal-active');
    document.querySelector(".series").classList.remove('series-active');
    document.querySelector(".commercial").classList.remove('commercial-active');

    if (document.querySelector(".personal-button").checked) {
        document.querySelector(".personal").classList.add('personal-active');
        main.classList.add("piecestype");
    }
    if (document.querySelector(".series-button").checked) {
        document.querySelector(".series").classList.add('series-active');
        main.classList.add("seriestype");
    }
    if (document.querySelector(".commercial-button").checked) {
        document.querySelector(".commercial").classList.add('commercial-active');
        main.classList.add("piecestype");
    }
    FetchLocationTest();
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
    modal.classList.remove('modal-open');
}

function minusSlides() {
    actualNumber = number;

    if (actualNumber == 1) {
        actualNumber = ActiveArrayLength;
        actualNumber--;
    } else {
        actualNumber--;
        actualNumber--;
    }
    /*     console.log(personalData[actualNumber].id); */
    console.log(actualNumber);
    x = ActiveArray[actualNumber].id;
    showSlides(x);
}

function plusSlides() {

    actualNumber = number;
    if (actualNumber == ActiveArrayLength) {
        actualNumber = 0;
    } else {
        actualNumber;
    }
    /*     console.log(personalData[actualNumber].id); */
    console.log(actualNumber);

    x = ActiveArray[actualNumber].id;
    showSlides(x);
}


function openLightbox(e) {

    console.log(e);
    modal.classList.add('modal-open');
    slideIndex = e.id;
    showSlides(slideIndex);


}

function openSerie(e) {
    console.log(e);

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
    if (document.querySelector(".commercial-button").checked) {
        ActiveArrayLength = commercialData.length;
        ActiveArray = commercialData;
        image = document.getElementById(n).firstElementChild.firstElementChild.outerHTML;
        title = document.getElementById(n).firstElementChild.nextElementSibling.firstElementChild.innerHTML;
        number = document.getElementById(n).firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
        console.log(number);
        GalleryLength = c;
    }
    if (document.querySelector(".series-button").checked) {

    }
    if (document.querySelector(".personal-button").checked) {
        ActiveArrayLength = personalData.length;
        ActiveArray = personalData;
        image = document.getElementById(n).firstElementChild.firstElementChild.outerHTML;
        title = document.getElementById(n).firstElementChild.nextElementSibling.innerHTML;
        number = document.getElementById(n).firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
        GalleryLength = p;
    }

    /* var description = document.getElementById(slideIndex).firstElementChild.nextElementSibling
        .firstElementChild
        .nextElementSibling.nextElementSibling.innerHTML; */
    fillLightbox();
}

function fillLightbox() {
    document.querySelector(".lightbox-image-box").firstElementChild.innerHTML = image;
    console.log(title);
    document.querySelector(".lightbox_text_title").innerHTML = title;
    //  document.querySelector(".lightbox_text_description").innerHTML = description;
    document.querySelector(".lightbox_text_number").innerHTML = (number + " / " + GalleryLength);
}
