// For changing navbar for mobile view
function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
}

// Animating numbers
const animationDuration = 2000;
const steps = 100; 
const increment = (target) => target / steps; 
const interval = animationDuration / steps; 

// Function to animate the number
const updateCount = (counter, target) => {
    let current = 0;

    const animate = () => {
        current += increment(target);

        if (current <= target) {
            counter.innerText = Math.ceil(current); 
            setTimeout(animate, interval);
        } else {
            counter.innerText = target; 
        }
    };

    animate(); 
};

// IntersectionObserver to detect when the numbers come into view
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');

            updateCount(counter, target);

            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 }); 

const counters = document.querySelectorAll('.home-s2-square-animated-number');

// Observe each counter
counters.forEach(counter => {
    observer.observe(counter);
});

// Animated slide
const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")

        let newIndex = [...slides.children].indexOf(activeSlide) + offset

        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})