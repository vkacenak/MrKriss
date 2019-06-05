var burger = document.querySelector('.bar__burger');
var bar = document.querySelector('.bar');
var bigLogo = document.querySelector('.bar__logo-big');
var smallLogo = document.querySelector('.bar__logo-small');

burger.addEventListener('click', function (){
  burger.classList.toggle('bar__burger-open');
bar.classList.toggle('bar-open');

});


 function ScrollPlease(x) {
    if (x.matches) { // If media query matches
        window.onscroll = () => {
            if (this.scrollY <= 10) {
            bar.classList.remove('scrolled');
            
        }
            else {               bar.classList.add('scrolled');    
        }

        };
    } 
}
var x = window.matchMedia("(max-width: 700px)")
ScrollPlease(x) // Call listener function at run time
x.addListener(ScrollPlease);
