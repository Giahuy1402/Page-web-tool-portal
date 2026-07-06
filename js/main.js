/**
 * Core Logic Module - Core structural mechanics, UI bindings, native responsive navigation, 
 * modal dynamic viewports, counters and native element rendering.
 */

document.addEventListener("DOMContentLoaded", () => {
    dismissLoader();
    initNavbarScrolling();
    initMobileNav();
    initButtonRipples();
    initLightbox();
    initAccordion();
    initScrollSpy();
    triggerCounterAnimation();
});

/**
 * 1. Hides Preloader smoothly upon total assets fetching finish
 */
function dismissLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;
    
    window.addEventListener("load", () => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 600);
    });
    
    // Safety Fallback if window load hooks freeze
    setTimeout(() => {
        if(loader.style.display !== "none") {
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 600);
        }
    }, 2500);
}

/**
 * 2. Window Scroll Listener tracking to morph standard Navbar into dynamic Glass panel
 */
function initNavbarScrolling() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

/**
 * 3. Mobile Navigation Full Drawer Open/Dismiss Toggle
 */
function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const menu = document.querySelector(".nav-menu");
    const links = document.querySelectorAll(".nav-link");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        menu.classList.toggle("open");
        toggle.querySelector("i").classList.toggle("fa-bars");
        toggle.querySelector("i").classList.toggle("fa-xmark");
    });

    // Auto close menu context once user taps link on Mobile view
    links.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            toggle.querySelector("i").classList.add("fa-bars");
            toggle.querySelector("i").classList.remove("fa-xmark");
        });
    });
}

/**
 * 4. Micro-Interaction: Advanced Button Wave Ripple Rendering Engine
 */
function initButtonRipples() {
    const buttons = document.querySelectorAll(".ripple-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement("span");
            ripple.classList.add("ripple");
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/**
 * 5. Lightbox Modal Gallery Overlay Configuration
 */
function initLightbox() {
    const modal = document.getElementById("lightbox-modal");
    const modalImg = document.getElementById("lightbox-img");
    const captionText = document.getElementById("lightbox-caption");
    const triggers = document.querySelectorAll(".lightbox-trigger");
    const closeBtn = document.querySelector(".lightbox-close");

    if (!modal || !modalImg) return;

    triggers.forEach(img => {
        img.addEventListener("click", function() {
            modal.style.display = "flex";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            document.body.style.overflow = "hidden"; // Prevent background scroll freeze
        });
    });

    const dismiss = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    closeBtn.addEventListener("click", dismiss);
    modal.addEventListener("click", (e) => {
        if(e.target === modal) dismiss();
    });
}

/**
 * 6. Native FAQ Max-Height Based Slide CSS Accordion Component
 */
function initAccordion() {
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", function() {
            const item = this.parentElement;
            const body = item.querySelector(".accordion-body");
            const isActive = item.classList.contains("active");

            // Close all items first for strict clean Accordion exclusive behavior
            document.querySelectorAll(".accordion-item").forEach(el => {
                el.classList.remove("active");
                el.querySelector(".accordion-body").style.maxHeight = null;
                el.querySelector(".accordion-body").style.paddingBottom = null;
            });

            if (!isActive) {
                item.classList.add("active");
                body.style.maxHeight = body.scrollHeight + 24 + "px"; // Dynamically pass exact child internal pixel scale
                body.style.paddingBottom = "24px";
            }
        });
    });
}

/**
 * 7. Active ScrollSpy Track - Highlights current layout tier active node on Navbar links
 */
function initScrollSpy() {
    const sections = document.querySelectorAll("section, header");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight shift exact trigger point adjustment threshold
            if (window.scrollY >= (sectionTop - 200)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
}

/**
 * 8. Dynamic Software Build Target Version Count-Up Micro Animation
 */
function triggerCounterAnimation() {
    const versionNode = document.querySelector(".counter-version");
    if (!versionNode) return;
    
    // Simulates an elegant counting up visual to standard version format string 
    let currentVal = 0.0;
    const targetVal = 1.0; 
    
    const interval = setInterval(() => {
        currentVal += 0.1;
        if (currentVal >= targetVal) {
            versionNode.textContent = "1.0.4"; // Return target structural version tag on halt
            clearInterval(interval);
        } else {
            versionNode.textContent = currentVal.toFixed(1) + ".0";
        }
    }, 80);
}