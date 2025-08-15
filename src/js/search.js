import { Gradient } from './Gradient.js'

// Create your instance
const gradient = new Gradient()

// Call `initGradient` with the selector to your canvas
gradient.initGradient('#gradient-canvas')

import '../css/navbar.css';
import '../css/search.css';

import Fuse from "fuse.js";
import searchData from '../assets/search-data.json';
import fallbackImage from "../assets/images/fallback.jpg";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("results-container");

  // Fuse.js config
  const fuse = new Fuse(searchData, {
    keys: ["title", "keywords"],
    threshold: 0.3,
  });

  const renderResults = (results) => {
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>No matches found.</p>";
      return;
    }

    results.forEach(({ item }) => {
      const resultEl = document.createElement("div");
      resultEl.classList.add("search-result");

      resultEl.innerHTML = `
        <div class="result-text">
          <a href="${item.url}" class="result-title">${item.title}</a>
        </div>
        <div class="result-image">
          <img src="${item.image || fallbackImage}" alt="${item.title}" />
        </div>
      `;

      resultsContainer.appendChild(resultEl);
    });
  };

  // Initial render
  renderResults(searchData.map(item => ({ item })));

  input.addEventListener("input", () => {
    const query = input.value.trim();
    const results = query ? fuse.search(query) : searchData.map(item => ({ item }));
    renderResults(results);
  });
});
