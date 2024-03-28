window.addEventListener('DOMContentLoaded', function () {
    initSliders();
    initValidators();
    initLibs();
});

function initLibs() {
    $('input[type="tel"]').inputmask("+7 (999) 999-99-99");

    if (document.querySelector('#index-map')) {
        function init() {
            let map = new ymaps.Map('index-map', {
                center: [55.67106206905689, 37.51875749999999],
                zoom: 16,
                controls: []
            });

            let placemark = new ymaps.Placemark([55.67106206905689, 37.51875749999999],
                {},
                {
                    iconLayout: 'default#image',
                    iconImageHref: '/upload/images/baloon.svg',
                    iconImageSize: [67, 82],
                    iconImageOffset: [-25, -85]
                }
            );


            map.geoObjects.add(placemark);

        }

        ymaps.ready(init);
    }
}

function initSliders() {
    const swiperPartners = document.querySelector('.index-partners');
    if (swiperPartners) {
        new Swiper(
            swiperPartners.querySelector('.index-partners__swiper'),
            {
                slidesPerView: 3,
                spaceBetween: 5,
                rewind: true,
                // Navigation arrows
                navigation: {
                    nextEl: swiperPartners.querySelector('.index-partners__next'),
                    prevEl: swiperPartners.querySelector('.index-partners__prev'),
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 15
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 15
                    },
                }
            }
        );
    }
}

function initValidators() {

}


class Events {
    constructor() {

        this.events = new Set();

        document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll(`[data-event]`).forEach(i => {
                i.dataset.event.split(',').forEach((event) => {
                    let [eventType, eventName] = event.split('.');

                    if (!this[eventName]) return;

                    this.events.add(eventType);
                });
            });
            this.init();
        });
    }

    init() {

        const body = document.querySelector("body");

        this.events.forEach((type) => {

            body.addEventListener(type, (e) => {
                const target = e.target.closest(`[data-event]`);
                if (!target) return;

                target.dataset.event.split(',').forEach((event) => {
                    let [eventType, eventName] = event.split('.');

                    if (type !== eventType || !this[eventName]) return;

                    this[eventName].call(this, e, target);
                });
            });
        });

    }

    sample(e, elem) {
        e.preventDefault();

        console.log(e);
        console.log(elem);
    }

    sendForm(e, elem) {
        e.preventDefault();

        fetch(elem.action, {
            method: 'POST',
            body: new FormData(elem)
        }).then(response => response.json()).then(function (data) {
            if (data.status) {
                elem.reset();
                toastr["success"]("Мы скоро свяжемся с вами.", "Спасибо!");
            } else {
                toastr["error"](data.error);
            }

        }).catch(function (err) {
            alert('Fetch Error :-S', err);
        });
    }

}

new Events();

