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

// Scroll reveal (stats, who we are, where we work)
const revealObserver = new IntersectionObserver(
    (entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.home-reveal').forEach((el) => {
    revealObserver.observe(el);
});

// What we do — staggered card fade-up (left to right)
const s4Grid = document.querySelector('.home-s4__grid');
if (s4Grid) {
    const s4Cards = [...s4Grid.querySelectorAll('.home-s4-card-reveal')];
    const s4StaggerMs = 150;

    const s4GridObserver = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    s4Cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('is-visible');
                        }, index * s4StaggerMs);
                    });
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    s4GridObserver.observe(s4Grid);
}
