/**
 * Animation Module - Handles advanced on-scroll reveal, mouse interactions, and typography effects.
 */
document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initMouseGlow();
    initTypingEffect();
});

/**
 * 1. Scroll Reveal Mechanism utilizing high-performance Intersection Observer API
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-slide-up, .reveal-fade');
    
    const observerOptions = {
        root: null, 
        threshold: 0.1, // Trigger when 10% of element is inside viewport
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Optimize performance by unobserving once run
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * 2. Premium Desktop Mouse Radial Glow Tracking Effect
 */
function initMouseGlow() {
    const glow = document.getElementById("mouse-glow");
    if (!glow) return;

    window.addEventListener("mousemove", (e) => {
        // Sử dụng requestAnimationFrame để đồng bộ hóa hoàn hảo với render cycle của trình duyệt
        requestAnimationFrame(() => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
    });
}

/**
 * 3. Dynamic Automated Subtitle Typing Simulator
 */
function initTypingEffect() {
    const target = document.getElementById("typing-effect");
    if (!target) return;

    const phrases = ["thông minh", "tối ưu hiệu năng", "bảo mật cao", "tự động hóa"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 150;

    function runLoop() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            target.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            delay = 60; 
        } else {
            target.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            delay = 120;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            delay = 2000; // Thử thách thời gian dừng đọc cụm từ
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }

        setTimeout(runLoop, delay);
    }

    runLoop();
}