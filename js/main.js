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
$(function(){
    $(".go-to").on("click", function(e){
        e.preventDefault();
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - 120
		}, 400);
        $('.input-focus').focus();
        $('#error').removeClass('active');
        $('.overlay').removeClass('active');
		return false;
	}); 
    $('.overlay').on('click', function() {
        $(this).removeClass('active');
        $('.popup').removeClass('active')
    })
    $('.btn-check').on('click', function(e) {
        e.preventDefault();
        var inputValue = $('.input-check-nubmer').val();
        if(!inputValue) {
            $('#error').addClass('active');
            $('.overlay').addClass('active');
        } else {
            $('#check').addClass('active');
            $('.overlay').addClass('active');
        }
    })
    $('.popup-close').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.popup').removeClass('active');
        $('.overlay').removeClass('active')
    })

    function mask(event) {    
        var matrix = "+7 (___) ___ ____",    
            i = 0,

            def = matrix.replace(/\D/g, ""),    
            val = this.value.replace(/\D/g, "");    
        if (def.length >= val.length) val = def;    
        this.value = matrix.replace(/./g, function(a) {    
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a   
        });
   
        if (event.type == "blur") {    
            if (this.value.length == 2) this.value = ""
    
        } else setCursorPosition(this.value.length, this)   
    };    
    inputs = document.querySelectorAll(".tel");
    for (i=0; i <inputs.length; i++){  
        inputs[i].addEventListener("input", mask, false);   
        inputs[i].addEventListener("focus", mask, false);    
        inputs[i].addEventListener("blur", mask, false);
    }  

    // валидация формы  ============================================
    const forms = document.querySelectorAll('.form');
    for(i=0; i< forms.length; i++){
        forms[i].addEventListener('submit', sendForm)
    }
    async function sendForm (e) {
        e.preventDefault();
        let error = formValivate(this);
        let formData = new FormData(this);
        if (error === 0){
            this.classList.add('sending');
            let response = await fetch('test.php', {
                method: 'POST',
                body: formData,
            })
            if(response.ok) {
                let result = await response.json();
                this.reset();
                this.classList.remove('sending');
                document.getElementById('thank-you').classList.add('active');
                document.querySelector('.overlay').classList.add('active');
            } else {       
                this.reset();             
                this.classList.remove('sending');
            }
        }
    }
    function formValivate (form) {  
        const formsCildren = form.querySelectorAll('.valid');        
        let erorr = 0;
        for (i= 0; i< formsCildren.length; i++) { 
            formRemoveErorr(formsCildren[i]);
            if (formsCildren[i].tagName === 'INPUT') {
                let input = formsCildren[i];
                let inputAtr = input.getAttribute('type');
                if (inputAtr === 'tel' && input.value.length < 17) {
                    formAddErorr(input);
                    erorr++
                }else if (inputAtr === 'text' && input.value.length < 2) {
                    formAddErorr(input);
                    erorr++
                }
            }
            
        }
        return erorr;
    }
    function formAddErorr (elem) {
        elem.parentElement.classList.add('error')
        elem.classList.add('error')
    }
    function formRemoveErorr (elem) {
        elem.parentElement.classList.remove('error')
        elem.classList.remove('error')
    }
});