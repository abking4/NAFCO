
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/fonts.css';
import '../css/navbar.css';
import '../css/footer.css';
import '../css/privacypolicy.css';
import { initNavbar } from '../js/navbar.js';
import { setupFooter } from '../js/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  setupFooter(); // Injects and wires up the footer for that page
});


initNavbar();

gsap.to(".policybody-wrapper", {
      y: () => {
        const footer = document.querySelector('.footer');
        const policy = document.querySelector('.policybody-wrapper');
        const footerTop = footer.getBoundingClientRect().top + window.scrollY;
        const policyTop = policy.getBoundingClientRect().top + window.scrollY;
        return footerTop - policyTop - policy.offsetHeight;
      },
      ease: "none",
      scrollTrigger: {
        trigger: ".policybody-wrapper",
        start: "top bottom",  // start when wrapper enters bottom of screen
        end: () => {
          const footer = document.querySelector('.footer');
          const policy = document.querySelector('.policybody-wrapper');
          const footerTop = footer.getBoundingClientRect().top + window.scrollY;
          return footerTop - window.innerHeight;
        },
        scrub: true,
      }
    });




gsap.registerPlugin(ScrollTrigger);

// Grab the headline element
const headline = document.querySelector(".header-headline");

// Split text into spans per word
const words = headline.textContent.trim().split(" ");
headline.innerHTML = ""; // Clear the original text

words.forEach(word => {
  const span = document.createElement("span");
  span.textContent = word;
  headline.appendChild(span);
});

// Animate the words upward into view
gsap.to(".header-headline span", {
  y: 0,
  opacity: 1,
  duration: 2,
  ease: "power4.out",
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".header-headline",
    start: "top 80%", // adjust based on layout
    toggleActions: "play none none reverse"
  }
});




