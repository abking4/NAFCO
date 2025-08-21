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
  const navIconToggle = document.querySelector('.nav-icon-toggle');
  const searchInput = searchWrapper?.querySelector('input');
  const underline = document.querySelector('.navbar-underline');
  const navbar = document.querySelector('.navbar');
  const logoButton = document.querySelector('.logo-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const iconSvg = navIconToggle.querySelector('.nav-icon-svg');

  let mobileMenuOpen = false;
  let currentLogo = 'dark';

  async function loadLogo(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const svgText = await response.text();
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
      const svg = svgDoc.querySelector("svg");
      if (!svg) throw new Error("SVG not found");

      logoContainer.innerHTML = "";
      logoContainer.appendChild(svg);

      svg.classList.add("nav-logo");
      svg.setAttribute("overflow", "visible");
    } catch (error) {
      console.error("Logo loading failed:", error);
    }
  }

  // Load initial dark logo
  await loadLogo(logoDarkUrl);

  // Logo hover behavior
  if (logoButton) {
    logoButton.addEventListener("mouseenter", async () => {
      if (currentLogo !== 'light') {
        await loadLogo(logoUrl);
        currentLogo = 'light';
      }
    });

    logoButton.addEventListener("mouseleave", async () => {
      if (currentLogo !== 'dark') {
        await loadLogo(logoDarkUrl);
        currentLogo = 'dark';
      }
    });
  }

  // Scroll behavior
  let lastScrollY = window.scrollY;
  let ticking = false;
  const scrollThreshold = 300;
  const scrollDelta = 10;

  function handleScroll() {
    if (mobileMenuOpen) return; // Don't hide/show navbar when mobile menu is open

    const currentScroll = window.scrollY;
    const diff = Math.abs(currentScroll - lastScrollY);

    if (diff < scrollDelta) {
      ticking = false;
      return;
    }

    if (currentScroll > lastScrollY && currentScroll > scrollThreshold) {
      gsap.to(navbar, { y: "-100%", duration: 1, ease: "power3.out" });
    } else if (currentScroll < lastScrollY) {
      gsap.to(navbar, { y: "0%", duration: 1, ease: "power3.out" });
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

  // Set nav visible on load
  gsap.set(navbar, { y: 0 });

  // Clear search input on load/visibility change
  function clearSearchInput() {
    if (searchInput) searchInput.value = '';
    if (searchWrapper) searchWrapper.classList.remove('active');
  }

  window.addEventListener('DOMContentLoaded', clearSearchInput);
  window.addEventListener('pageshow', clearSearchInput);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') clearSearchInput();
  });

  // === NAV ICON TOGGLE LOGIC ===
  if (navIconToggle && searchWrapper && searchInput && mobileMenu) {
    function openMobileMenu() {
      mobileMenu.classList.add('active');
      document.body.classList.add('no-scroll');
      iconSvg.querySelector('.icon-hamburger').style.display = 'none';
      iconSvg.querySelector('.icon-close').style.display = 'block';
      iconSvg.querySelector('.icon-magnify').style.display = 'none';
      mobileMenuOpen = true;
    }

    function closeMobileMenu() {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
      iconSvg.querySelector('.icon-close').style.display = 'none';
      iconSvg.querySelector('.icon-hamburger').style.display = 'block';
      iconSvg.querySelector('.icon-magnify').style.display = 'none'; // Magnify hidden in mobile mode
      mobileMenuOpen = false;
    }

    function showSearchIcon() {
      iconSvg.querySelector('.icon-close').style.display = 'none';
      iconSvg.querySelector('.icon-hamburger').style.display = 'none';
      iconSvg.querySelector('.icon-magnify').style.display = 'block';
    }

    // Initialize icons based on screen size
    function updateIconsOnResize() {
      const isMobile = window.innerWidth <= 1080;

      if (isMobile) {
        if (mobileMenuOpen) {
          openMobileMenu();
        } else {
          closeMobileMenu();
        }
      } else {
        // Desktop: show search icon only, close mobile menu if open
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
        mobileMenuOpen = false;
        showSearchIcon();
      }
    }

    // Run on load
    updateIconsOnResize();

    navIconToggle.addEventListener('click', () => {
      const isMobile = window.innerWidth <= 1080;

      if (isMobile) {
        if (mobileMenuOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      } else {
        // Desktop: toggle search bar
        const isActive = searchWrapper.classList.contains('active');
        searchWrapper.classList.toggle('active');
        if (!isActive) searchInput.focus();
      }
    });

    window.addEventListener('resize', () => {
      updateIconsOnResize();
    });
  } else {
    console.warn('Missing one of: navIconToggle, searchWrapper, searchInput, or mobileMenu');
  }
}




// mobile menu image animation

const images = document.querySelectorAll(".mobile-menu-image-mask img");
const total = images.length;
const maskDuration = 2; // time it takes for each mask animation
const holdDuration = 2; // how long each image stays fully visible before next starts

// Initialize images: first visible, rest hidden
gsap.set(images[0], { clipPath: "inset(0 0% 0 0)", zIndex: total });
for (let i = 1; i < total; i++) {
  gsap.set(images[i], { clipPath: "inset(0 100% 0 0)", zIndex: total - i });
}

function animateMaskedSlider() {
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });

  for (let i = 1; i < total; i++) {
    const img = images[i];

    tl.to(img, {
      clipPath: "inset(0 0% 0 0)", // mask in left → right
      duration: maskDuration,
      onStart: () => {
        gsap.set(img, { zIndex: total });
        for (let j = 0; j < i; j++) {
          gsap.set(images[j], { zIndex: total - (i - j) });
        }
      }
    });

    // Hold the image fully visible before next starts
    tl.to({}, { duration: holdDuration });
  }

  // Last image masks out right → left
  tl.to(images[total - 1], {
    clipPath: "inset(0 0 0 100%)", // right → left
    duration: maskDuration,
    onStart: () => {
      gsap.set(images[0], { zIndex: total }); // first image back on top for next cycle
    }
  });

  // Optional: hold first image for a moment before looping
  tl.to({}, { duration: holdDuration });
}

animateMaskedSlider();










