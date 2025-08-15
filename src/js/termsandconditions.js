
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/fonts.css';
import '../css/navbar.css';
import '../css/footer.css';
import '../css/termsandconditions.css';
import { initNavbar } from '../js/navbar.js';
import { setupFooter } from '../js/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  setupFooter(); // Injects and wires up the footer for that page
});


initNavbar();


gsap.registerPlugin(ScrollTrigger);

gsap.to(".policybody", {
  y: -700,  // moves it upward
  ease: "none",
  scrollTrigger: {
    trigger: ".policybody",
    start: "top bottom",
    end: "top top",
    scrub: true
  },
  // this ensures it uses 3D transforms under the hood
  // no need to add manually, gsap handles it
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




