window.addEventListener('DOMContentLoaded', function () {
    initSliders();
    initValidators();
    initLibs();
});

function initLibs() {

}

function initSliders() {

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

