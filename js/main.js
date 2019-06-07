var burger = document.querySelector('.bar__burger');
var bar = document.querySelector('.bar');
var bigLogo = document.querySelector('.bar__logo-big');
var smallLogo = document.querySelector('.bar__logo-small');
var main = document.querySelector('main');

/// BURGER MENU TOGGLE
burger.addEventListener('click', function () {
    burger.classList.toggle('bar__burger-open');
    bar.classList.toggle('bar-open');
    main.addEventListener('click', function(){
        bar.classList.remove('bar-open');
        burger.classList.remove('bar__burger-open');
    })

});


// NAVBAR CHANGE ON SCROLL 
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


FetchLocationTest();

/// FETCHING STUFF


//Checks whether there is something to fetch on page, if there is, builds link accordingly
function FetchLocationTest() {
    if (main.classList.contains('presstype') || main.classList.contains('piecestype') || main.classList.contains('seriestype') || main.classList.contains('newstype')) {
        let type = main.classList;

        let fetchLink = "http://viktorkacenak.com/MrKriss/wordpress/wp-json/wp/v2/" + type + "?per_page=15&_embed";
        console.log(fetchLink);
        JSONFetch(fetchLink, type);
    }
}

// Fetch function
function JSONFetch(link, type) {

    console.log(type);

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
                    break; /*  */

                case "seriesFull":
                    createSeriesFull(data);
                    break;

                case "presstype":
                    console.log(type);
                    createPress(data);
                    break;

                case "newstype":
                    console.log(type);
                    createNews(data);
                    break;
            }
            
            console.log(data);
        }
    };

    request.send();
}

// TEMPLATE PRODUCTION FOR PRESS ON MAIN PAGE
function createPress(data) {
    console.log(data);
    var template = document.querySelector(".pressTemplate").content;
    for (i = 0; i < data.length; i++) {
        const clone = template.cloneNode(true);
      clone.querySelector('.press__title').innerHTML = data[i].title.rendered;
      clone.querySelector('.press__source').innerHTML = 'By ' + data[i].source;
      clone.querySelector('.press__link').href =  data[i].link;


    
       document.querySelector('.press__list').appendChild(clone);

       if (data[i].featured == "1"){
          document.querySelector('.press-featured h3').innerHTML = data[i].title.rendered;
          document.querySelector('.press-featured h4').innerHTML = data[i].source;
          document.querySelector('.press-featured a').href = data[i].link;
       }
    }
}

// TEMPLATE PRODUCTION FOR NEWS ON NEWS PAGE

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


//////////// GALLERY /////////////


// Variables 
var c = 0;
var p = 0;
var s = 0;
var modal = document.getElementById("myModal");
console.log(modal);

var image = 0;
var title = 0;
var number = 0;
var numberE = 0;
var personalData = [];
var commercialData = [];
var seriesData = [];
var actualNumber = 0;
var haha = 0;
var articleId = 0;


// Create series from fetched data 
function createSeries(data) {

    if (!document.querySelector('.series').classList.contains('series-fetched')) {
        console.log(data);
        var template = document.querySelector(".seriesTemplate").content;
        for (i = 0; i < data.length; i++) {
            const clone = template.cloneNode(true);
            clone.querySelector('.series__box__src').src = data[i].cover_image.guid;
            clone.querySelector('.series__box__title').innerHTML = data[i].title.rendered;
            clone.querySelector('.series__box').id = data[i].id;
            document.querySelector('.series').appendChild(clone);
            document.querySelector('.series').classList.add('series-fetched');
        }
    }



}

// Create pieces from fetched data
// Pieces data includes personal and commercial work, as they have the same structure

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
                    clone.querySelector('.commercial__box__src').src = data[i].image.guid;
                    clone.querySelector('.commercial__box__title').innerHTML = data[i].title.rendered;
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



// If you are located on the gallery page run the function
if (document.querySelector("body").classList.contains('gallery__web')) {
    checkButtons();
}

// Check on what section you are currently
function checkButtons() {
    document.querySelector(".personal").style.display = "none";
    document.querySelector(".series").style.display = "none";
    document.querySelector(".commercial").style.display = "none";

    if (document.querySelector(".personal-button").checked) {
        document.querySelector(".personal").style.display = "block";
        main.classList.add("piecestype");
    }
    if (document.querySelector(".series-button").checked) {
        document.querySelector(".series").style.display = "block";
        main.classList.add("seriestype");
    }
    if (document.querySelector(".commercial-button").checked) {
        document.querySelector(".commercial").style.display = "block";
        main.classList.add("piecestype");
    }
    FetchLocationTest();
}



var slideIndex = 1;
var slides = document.getElementsByClassName("image-lightbox-open");
var n = 1;
var x = 0;


// Full-screen mode on button
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

// Open light-box
function openLightbox(e) {
    console.log(e);
    modal.classList.add('modal-open');
    slideIndex = e.id;
    showSlides(slideIndex);
}

// Close light-box
function closeModal() {
    modal.classList.remove('modal-open');
}

// Light-box arrows - show next or previous image
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
    IDControler();
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

    IDControler();
    showSlides(x);
}

function IDControler(){
    if (document.querySelector("body").classList.contains('serie__web')) {
        x = ActiveArray[actualNumber].ID;}
        if (document.querySelector("body").classList.contains('gallery__web')) {
            x = ActiveArray[actualNumber].id;}
}

// Open page with series that you clicked on, by passing id of the element to the link
function openSerie(e) {
    window.location.replace('serie.html' + '?id=' + e.id, "");
}

// If you are located on the page with one series run the function
if (document.querySelector("body").classList.contains('serie__web')) {
    fillSerie();
}

// Create series from fetched data
function fillSerie() {
    const params = new URLSearchParams(location.search)
    articleId = params.get('id');
    console.log(articleId);

    let fetchLink = "http://viktorkacenak.com/MrKriss/wordpress/wp-json/wp/v2/seriestype/" + articleId;
    JSONFetch(fetchLink, ["seriesFull"]);
}


function createSeriesFull(data) {
    if (!document.querySelector('.serie').classList.contains('serie-fetched')) {
        console.log(data);
        document.querySelector('.serie__heading').innerHTML = data.title.rendered;
        console.log(data.title.rendered);

        var template = document.querySelector(".serieTemplate").content;
        for (i = 0; i < data.images.length; i++) {


            const clone = template.cloneNode(true);
            seriesData[s] = data.images[i];
            s++;
            clone.querySelector('.serie__box__src').src = data.images[i].guid;
            clone.querySelector('.serie__box').id = data.images[i].ID;
            clone.querySelector('.serie__box__number').innerHTML = s;
            document.querySelector('.serie').appendChild(clone);
            document.querySelector('.serie').classList.add('commercial-fetched');


        }

        /*         var template = document.querySelector(".seriesTemplate").content;
                for (i = 0; i < data.length; i++) {
                    const clone = template.cloneNode(true);
                    clone.querySelector('.series__box__src').src = data[i].cover_image.guid;
                    clone.querySelector('.series__box__title').innerHTML = data[i].title.rendered;
                    clone.querySelector('.series__box').id = data[i].id;
                    document.querySelector('.series').appendChild(clone);
                    document.querySelector('.serie').classList.add('serie-fetched');
                } */
    }
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

// Show elements in light-box by their ID passed to the function
function showSlides(n) {
    if (document.querySelector("body").classList.contains('gallery__web')) {
        if (document.querySelector(".commercial-button").checked) {
            ActiveArrayLength = commercialData.length;
            ActiveArray = commercialData;
            image = document.getElementById(n).querySelector('.commercial__box__src').src;
            title = document.getElementById(n).querySelector('.commercial__box__title').innerHTML;
            number = document.getElementById(n).querySelector('.commercial__box__number').innerHTML;
            GalleryLength = c;
        }
        if (document.querySelector(".personal-button").checked) {
            ActiveArrayLength = personalData.length;
            ActiveArray = personalData;
            image = document.getElementById(n).querySelector('.personal__box__src').src;
            title = document.getElementById(n).querySelector('.personal__box__title').innerHTML;
            number = document.getElementById(n).querySelector('.personal__box__number').innerHTML;
            GalleryLength = p;
        }
    }
    if (document.querySelector("body").classList.contains('serie__web')) {

            ActiveArrayLength = seriesData.length;
            ActiveArray = seriesData;   
            title = document.querySelector('.serie__heading').innerHTML;                    
            image = document.getElementById(n).querySelector('.serie__box__src').src;
            console.log(image);
            number = document.getElementById(n).querySelector('.serie__box__number').innerHTML;
            console.log(number);
            GalleryLength = s;
    }

    /* var description = document.getElementById(slideIndex).firstElementChild.nextElementSibling
        .firstElementChild
        .nextElementSibling.nextElementSibling.innerHTML; */

    fillLightbox();
}

function fillLightbox() {
    document.querySelector(".lightbox_image img").src = image;
    console.log(title);
    document.querySelector(".lightbox_text_title").innerHTML = title;
    //  document.querySelector(".lightbox_text_description").innerHTML = description;
    document.querySelector(".lightbox_text_number").innerHTML = (number + " / " + GalleryLength);
}
