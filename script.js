/* =============================================
   SANKETH H N - PORTFOLIO JAVASCRIPT
   ============================================= */

// ---- TYPING ANIMATION ----
const titles = [
    "ML Engineer",
    "AI Developer",
    "Python Developer",
    "Deep Learning Engineer",
    "Computer Vision Specialist"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

function typeWriter() {
    const currentTitle = titles[titleIndex];
    if (isDeleting) {
        typingEl.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    let speed = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === currentTitle.length) {
        speed = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 400;
    }
    setTimeout(typeWriter, speed);
}
setTimeout(typeWriter, 800);

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById("navbar");
function handleNavbarScroll() {
    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}
window.addEventListener("scroll", handleNavbarScroll, { passive: true });

// ---- ACTIVE NAV LINK HIGHLIGHTING ----
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
function highlightActiveNav() {
    let current = "";
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        if (section.offsetTop <= scrollPos) { current = section.id; }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}
window.addEventListener("scroll", highlightActiveNav, { passive: true });

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
    navLinksContainer.classList.toggle("open");
    const spans = hamburger.querySelectorAll("span");
    if (navLinksContainer.classList.contains("open")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
        spans[0].style.transform = "";
        spans[1].style.opacity = "";
        spans[2].style.transform = "";
    }
});
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navLinksContainer.classList.remove("open");
        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "";
        spans[1].style.opacity = "";
        spans[2].style.transform = "";
    });
});

// ---- FADE-IN INTERSECTION OBSERVER ----
const fadeEls = document.querySelectorAll(".fade-in");
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const siblings = entry.target.parentElement.querySelectorAll(".fade-in");
            let delay = 0;
            siblings.forEach((sibling, index) => {
                if (sibling === entry.target) delay = index * 80;
            });
            setTimeout(() => { entry.target.classList.add("visible"); }, delay);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
fadeEls.forEach(el => fadeObserver.observe(el));

// ---- SMOOTH SCROLL ----
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
        }
    });
});

// ---- INIT ----
handleNavbarScroll();
highlightActiveNav();
