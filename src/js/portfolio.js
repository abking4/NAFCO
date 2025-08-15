import { Gradient } from './Gradient.js'

// Create your instance
const gradient = new Gradient()

// Call `initGradient` with the selector to your canvas
gradient.initGradient('#gradient-canvas')

import '../css/navbar.css';
import '../css/portfolio.css';
import '../css/fonts.css';
import '../css/footer.css';

import { initNavbar } from '../js/navbar.js';
initNavbar();

import { setupFooter } from '../js/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  setupFooter(); // Injects and wires up the footer for that page
});

// Card Magnetize effect  

const grid = document.getElementById('portfolioGrid');

function attachCardHoverEffect() {
  const wrappers = grid.querySelectorAll('.portfolio-card-wrapper');

  wrappers.forEach(wrapper => {
    const card = wrapper.querySelector('.portfolio-card');
    const overlay = card.querySelector('.gradient-overlay');

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = x * 0.05; // Magnet strength
      const moveY = y * 0.05;

      card.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
      overlay.style.opacity = '1';
    });

    wrapper.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(0.95) translate(0, 0)';
      overlay.style.opacity = '0';
    });
  });
}

window.addEventListener('load', () => {
  attachCardHoverEffect();
});


// Removed resize listener for placePlusSigns as plus signs are static now
