function slider() {
    // Slider Carousel
    const slider = document.querySelector('.offer__slider'),
          slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
          slidesField = slider.querySelector('.offer__slider-inner'),
          slides = slider.querySelectorAll('.offer__slide'),
          prev = slider.querySelector('.offer__slider-prev'),
          next = slider.querySelector('.offer__slider-next'),
          current = slider.querySelector('#current'),
          total = slider.querySelector('#total'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1,
        offset = 0;

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            addZeroToCurrent();
        } else {
            total.textContent = slides.length; 
            addZeroToCurrent(); 
        }

    slidesField.style.width = 100 * slides.length + '%';

    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for( let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');

        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if ( i === 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function opacityDots() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function addZeroToCurrent() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex; 
        }
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex ++;
        }

        addZeroToCurrent();

        slidesField.style.transform = `translateX(-${offset}px)`;

        opacityDots();
    });

    prev.addEventListener('click', () => {

        if (offset == 0) {
            offset += deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex --;
        }

        addZeroToCurrent();

        slidesField.style.transform = `translateX(-${offset}px)`;
        opacityDots();
    });

    dots.forEach( dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;
            addZeroToCurrent();
            opacityDots();
        });
    });
}
module.exports = slider;