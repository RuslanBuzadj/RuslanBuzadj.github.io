// Webp ====================================================================
function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }
    else{
        document.querySelector('body').classList.add('no-webp');
    }
});
// /Webp ====================================================================

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
};


$(function(){
    $('.header__burger').click(function(){
        $('.header__burger, .nav, .content').toggleClass('active'); 
        $('body').toggleClass('lock');       
    });

    
    // прокрутка к якорю
    $('.go-to').click( function(e){ // ловим клик по ссылке с классом go_to
        e.preventDefault();
          var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
              if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); // анимируем скроолинг к элементу scroll_el
              }
            return false; // выключаем стандартное действие
          }); 

    // слайдер
    $('.nav__list li a').click(function () {        
        $('.active').removeClass('active');
        $(this).addClass('active');               
    });
   
    $('.scrollToTop').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 700);
        return false;
    });

    $('.add-services-slider').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 5,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="./img/svg/arrow-pref.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="./img/svg/arrow-next.svg" alt=""></button>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              arrows: true,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 600,
            settings: {
              arrows: true,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
      });

      
    // Карта

	if($('*').is('.map')){
        ymaps.ready(init);
             var myMap, 
                 myPlacemark;
 
             function init(){ 
                 myMap = new ymaps.Map("map", {
                     center: [46.47412857, 30.74600850],
                     zoom: 17
                 }); 
                 
                 myPlacemark = new ymaps.Placemark([46.47412857, 30.74600850], {
                     hintContent: 'Базарная улица., 36'
                 });
                 
                 myMap.geoObjects.add(myPlacemark);
                 myMap.behaviors.disable('scrollZoom');
             }
       };       
     
});