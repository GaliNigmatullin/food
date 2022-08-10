function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //slider 1 вариант

    // const slides = document.querySelectorAll('.offer__slide'),
    //       prev = document.querySelector('.offer__slider-prev'),
    //       next = document.querySelector('.offer__slider-next'),
    //       total = document.querySelector('#total'),
    //       current = document.querySelector('#current');
    
    // let slideIndex = 1;

    // showSlides(slideIndex);

    // if(slides.length < 10){
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if(n > slides.length){
    //         slideIndex = 1;
    //     }

    //     if(n < 1){
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

    //     if(slides.length < 10){
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    
    // }

    // function plusSlides(n){
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    //слайдер 2 вариант

    
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow ),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
    
    let slideIndex = 1;
    let offset = 0; // отсутп

    // выбираем активную точку
    function changeOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    // проверяем число слайдов, подставляем 0 пере числом (номер слайда)   
    function countCheck() {
        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    // проверям общее число слайдов подставляем 0
    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; // увеличиваем размер подложки в соот-ие с колвом слайдов
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden'; 
    
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    // формируем блок точек
    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    //добавляем в род блок
    slider.append(indicators);
    // формируем доты и добавляем атрибуты
    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
    
        if(i === 0){
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits (str){
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if(offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        countCheck();

        changeOpacity();
    });

    prev.addEventListener('click', () => {
        if(offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        countCheck();

        changeOpacity();

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
           
            slidesField.style.transform = `translateX(-${offset}px)`;

            countCheck();

            changeOpacity();
            
        });
    });
}

export default slider;