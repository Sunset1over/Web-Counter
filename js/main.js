

window.addEventListener("load", windowLoad);

function windowLoad() {
    
    function digitsCountersInit(digitsCounterItems) {

        let digitsCounters = digitsCounterItems ? digitsCounterItems : document.querySelectorAll("[data-digital-counter]");

        if (digitsCounters) {
            digitsCounters.forEach(digitsCounter => {
                    digitsCounterAnimate(digitsCounter);
            });
        }
    }

    function digitsCounterAnimate(digitsCounter) {

        let startTimestamp = null; 
        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
        const startValue = parseInt(digitsCounter.innerHTML);
        const startPosition = 0;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
            
        };
        window.requestAnimationFrame(step);
    }

    //digitsCountersInit();



    let options = {
        threshold: 0.3
    }
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const digitsCountersItems = targetElement.querySelectorAll("[data-digital-counter]");

                if (digitsCountersItems.length) {
                    digitsCountersInit(digitsCountersItems);
                }

                //observer.unobserve(targetElement);
            }
        });
    }, options);

    let sections = document.querySelectorAll('.page__section');

    if (sections.length) {
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    console.log(sections);
}