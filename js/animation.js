/**
 * Animation Module - Handles advanced on-scroll reveal transitions.
 */
document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
});

/**
 * 1. Scroll Reveal Mechanism utilizing high-performance Intersection Observer API
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-slide-up, .reveal-fade');
    
    if (revealElements.length === 0) return;

    const observerOptions = {
        root: null, 
        threshold: 0.08, // Trigger when 8% of the element is visible
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Optimize performance by unobserving once revealed
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}