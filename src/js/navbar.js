import '../css/navbar.css';
import '../css/fonts.css';

import logoLight from '../../public/assets/logo-light.svg';
import logoDark from '../../public/assets/logo-dark.svg';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const logoUrl = logoLight;
const logoDarkUrl = logoDark;

export async function initNavbar() {
  console.log('initNavbar running');

  const logoContainer = document.querySelector(".logo-button");
  const searchWrapper = document.querySelector('.search-wrapper');
  const searchToggle = document.querySelector('.search-toggle');
  const searchInput = searchWrapper?.querySelector('input');
  const underline = document.querySelector('.navbar-underline');
  const navbar = document.querySelector('.navbar');
  const logoButton = document.querySelector('.logo-button');

  console.log('logoContainer:', logoContainer);
  console.log('logoButton:', logoButton);

  let currentLogo = 'dark'; // Initial state (starts with dark logo)

  // Load and inject SVG logo
  async function loadLogo(url) {
    console.log('Loading logo:', url);
    if (!logoContainer) {
      console.warn('No logo container found!');
      return;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Fetch failed:', response.status, response.statusText);
        throw new Error('Network response was not ok');
      }

      const svgText = await response.text();
      console.log('SVG text loaded (first 100 chars):', svgText.substring(0, 100));

      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
      const svg = svgDoc.querySelector("svg");
      if (!svg) {
        throw new Error("SVG not found in file");
      }

      logoContainer.innerHTML = "";
      logoContainer.appendChild(svg);

      svg.classList.add("nav-logo");
      svg.style.height = "35px";
      svg.style.width = "auto";
      svg.style.transition = "filter 0.3s ease";
      svg.setAttribute("overflow", "visible");

      // Removed glow filter and event listeners per your request

    } catch (error) {
      console.error("Logo loading failed:", error);
    }
  }

  // Initial load - always dark logo
  await loadLogo(logoDarkUrl);

  // Hover behavior - swap logo on mouse enter and leave
  if (logoButton) {
    logoButton.addEventListener("mouseenter", async () => {
      console.log('logoButton mouseenter');
      if (currentLogo !== 'light') {
        console.log('Switching logo to light');
        await loadLogo(logoUrl);
        currentLogo = 'light';
      } else {
        console.log('Logo already light, no swap needed');
      }
    });

    logoButton.addEventListener("mouseleave", async () => {
      console.log('logoButton mouseleave');
      if (currentLogo !== 'dark') {
        console.log('Switching logo back to dark');
        await loadLogo(logoDarkUrl);
        currentLogo = 'dark';
      } else {
        console.log('Logo already dark, no swap needed');
      }
    });
  } else {
    console.warn('No logoButton found to attach hover listeners!');
  }

// GSAP-powered scroll animation for navbar show/hide
let lastScrollY = window.scrollY;
let ticking = false;
let scrollThreshold = 300; // how far down the page before hiding
let scrollDelta = 10;      // minimum scroll movement before reacting

function handleScroll() {
  const currentScroll = window.scrollY;
  const diff = Math.abs(currentScroll - lastScrollY);

  if (diff < scrollDelta) {
    // If scroll movement is too small, do nothing
    ticking = false;
    return;
  }

  if (currentScroll > lastScrollY && currentScroll > scrollThreshold) {
    // Scrolling down
    gsap.to(navbar, {
      y: "-100%",
      duration: 1,
      ease: "power3.out"
    });
  } else if (currentScroll < lastScrollY) {
    // Scrolling up
    gsap.to(navbar, {
      y: "0%",
      duration: 1,
      ease: "power3.out"
    });
  }

  lastScrollY = currentScroll;
  ticking = false;
}


  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

  // Initialize navbar position on page load
  gsap.set(navbar, { y: 0 });

  // Optional: Search bar functionality (if needed)
  function clearSearchInput() {
    if (searchInput) searchInput.value = '';
    if (searchWrapper) searchWrapper.classList.remove('active');
  }

  window.addEventListener('DOMContentLoaded', clearSearchInput);
  window.addEventListener('pageshow', clearSearchInput);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') clearSearchInput();
  });

  if (searchToggle && searchWrapper && searchInput) {
    searchToggle.addEventListener('click', () => {
      const isActive = searchWrapper.classList.contains('active');
      console.log('Search toggle clicked, was active?', isActive);
      searchWrapper.classList.toggle('active');
      if (!isActive) {
        searchInput.focus();
      }
    });
  } else {
    console.warn('Search toggle, wrapper, or input not found');
  }
}
