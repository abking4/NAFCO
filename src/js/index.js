
import { Gradient } from './Gradient.js'

// Create your instance
const gradient = new Gradient()

// Call `initGradient` with the selector to your canvas
gradient.initGradient('#gradient-canvas')

import { gsap } from 'gsap';
import '../css/main.css'; // Import CSS into your Webpack build
import '../css/home.css';
import '../css/navbar.css';
import '../css/footer.css';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { initNavbar } from '../js/navbar.js';
initNavbar();

import { setupFooter } from '../js/footer.js';


document.addEventListener('DOMContentLoaded', () => {
  setupFooter(); // Injects and wires up the footer for that page
});




// Button Magnatize logic

document.querySelectorAll('.trace-button').forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = `translate(0, 0)`;
  });
});


/* old headline animation on load
window.addEventListener("load", () => {
  const headlineSpans = document.querySelectorAll(".hero-headline span");
  const subtext = document.querySelector(".hero-subtext");

  document.querySelector(".headline")?.classList.remove("hidden");
  subtext?.classList.remove("hidden");

  const tl = gsap.timeline({ delay: 0.2 });

  tl.from(headlineSpans, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
  });

  tl.from(subtext, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: "power2.out",
  }, "-=0.3");
});
*/


/* new hero headline animation

window.addEventListener("load", () => {
  const headline = document.querySelector(".hero-headline");
  const subtext = document.querySelector(".hero-subtext");
  const buttonWrapper = document.querySelector(".button-wrapper");

  if (!headline || !subtext || !buttonWrapper) return;

  // Split headline into word spans (your existing logic)
  const words = headline.textContent.trim().split(/\s+/);
  headline.innerHTML = "";
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.classList.add("word");
    headline.appendChild(span);
    if (index < words.length - 1) {
      headline.appendChild(document.createTextNode(" "));
    }
  });

  document.fonts.ready.then(() => {
    requestAnimationFrame(() => {
      headline.classList.add("visible");

      const tl = gsap.timeline();

      // Animate headline words
      tl.fromTo(
        ".hero-headline .word",
        { y: 60, opacity: 1 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", stagger: 0.08 }
      );

      // Animate subtext and button wrapper simultaneously *while* headline animates
      tl.fromTo(
        [subtext, buttonWrapper],
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
        "<" // start at same time as previous animation
      );
    });
  });
});
*/

// If using modules
import SplitType from 'split-type';

window.addEventListener("load", () => {
  const headline = document.querySelector(".hero-headline");
  const subtext = document.querySelector(".hero-subtext");
  const buttonWrapper = document.querySelector(".button-wrapper");

  if (!headline || !subtext || !buttonWrapper) return;

  document.fonts.ready.then(() => {
    // Clear previous if rerun
    headline.innerHTML = headline.textContent;

    const split = new SplitType(headline, {
      types: 'lines',
      lineClass: 'line',
    });

    // Wrap line content in <span> manually
    const lines = headline.querySelectorAll('.line');
    lines.forEach(line => {
      const span = document.createElement('span');
      span.innerHTML = line.innerHTML;
      line.innerHTML = '';
      line.appendChild(span);
    });

    // GSAP timeline
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-headline .line span",
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
      }
    );

    tl.fromTo(
      [subtext, buttonWrapper],
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
      "<0.3"
    );
  });
});









/*

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.querySelector('.grid-container');
  const gridWrapper = document.querySelector('.grid-wrapper');
  const preview = document.querySelector('.project-preview');
  const previewImage = document.querySelector('.preview-image');

  const projects = [
    {
      title: 'Warrior Met Coal Conveyor',
      image: require('../assets/images/webready/project1.jpg'),
      large: require('../assets/images/webready/project1b.jpg'),
    },
    {
      title: 'Brassfield & Gorrie',
      image: require('../assets/images/webready/project2.jpg'),
      large: require('../assets/images/webready/project2b.jpg'),
    },
    {
      title: 'UAB-Protective Stadium',
      image: require('../assets/images/webready/project3.jpg'),
      large: require('../assets/images/webready/project3b.jpg'),
    },
    {
      title: 'Childrens of Alabama',
      image: require('../assets/images/webready/project4.jpg'),
      large: require('../assets/images/webready/project4b.jpg'),
    },
    {
      title: 'Atlanta Falcons',
      image: require('../assets/images/webready/project5.jpg'),
      large: require('../assets/images/webready/project5.jpg'),
    },
    {
      title: 'Disney World',
      image: require('../assets/images/webready/project6.jpg'),
      large: require('../assets/images/webready/project6.jpg'),
    },
    {
      title: 'University of Alabama',
      image: require('../assets/images/webready/project7.jpg'),
      large: require('../assets/images/webready/project7.jpg'),
    },
    {
      title: 'University of Auburn',
      image: require('../assets/images/webready/project8.jpg'),
      large: require('../assets/images/webready/project8.jpg'),
    },
    {
      title: 'Warrior Met',
      image: require('../assets/images/webready/project9.jpg'),
      large: require('../assets/images/webready/project9.jpg'),
    },
    // Add more if needed
  ];

  let isAnimating = false;
  let currentImageSrc = '';

  function setupGrid() {
    const wrapperWidth = gridWrapper.clientWidth;
    const wrapperHeight = gridWrapper.clientHeight;

    let columns = 3;
    let rows = 5;

    while ((columns + 1) * (wrapperHeight / rows) <= wrapperWidth) {
      columns++;
    }

    while ((rows + 1) * (wrapperWidth / columns) <= wrapperHeight) {
      rows++;
    }

  
    const squareSize = Math.floor(wrapperHeight / rows);
    const totalItems = Math.max(9, columns * rows); // Minimum 9 items

    console.log('Grid setup:', { columns, rows, squareSize, totalItems });

    gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    gridContainer.style.gridAutoRows = `${squareSize}px`;
    gridContainer.innerHTML = '';
    

    for (let i = 0; i < totalItems; i++) {
      const project = projects[i % projects.length];
      const overlayClass = i % 2 === 0 ? 'overlay even' : 'overlay odd';

      const item = document.createElement('div');
      item.className = 'grid-item';
      item.innerHTML = `
        <img src="${project.image}" alt="${project.title}" />
        <div class="${overlayClass}"><span>${project.title}</span></div>
      `;

      item.addEventListener('mouseenter', () => {
        if (isAnimating) return;

        const newSrc = project.large;

        if (preview.classList.contains('show') && newSrc !== currentImageSrc) {
          isAnimating = true;
          preview.classList.remove('show');
          preview.classList.add('exit');

          setTimeout(() => {
            previewImage.src = newSrc;
            currentImageSrc = newSrc;
            preview.classList.remove('exit');
            preview.classList.add('show');
            isAnimating = false;
          }, 500);
        } else if (!preview.classList.contains('show')) {
          previewImage.src = newSrc;
          currentImageSrc = newSrc;
          preview.classList.add('show');
        }

        document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('hovered'));
        item.classList.add('hovered');
      });

      gridContainer.appendChild(item);
    }

    // 🧼 Clean up previous .first-row classes (on resize)
    gridContainer.querySelectorAll('.grid-item.first-row').forEach(item => {
      item.classList.remove('first-row');
    });

    // 🧠 Add .first-row class to items in the top row
    const allItems = gridContainer.querySelectorAll('.grid-item');
    for (let i = 0; i < columns && i < allItems.length; i++) {
      allItems[i].classList.add('first-row');
    }
  }

  setupGrid();
  window.addEventListener('resize', setupGrid);

  gridWrapper.addEventListener('mouseleave', () => {
    preview.classList.remove('show');
    preview.classList.add('exit');
    document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('hovered'));
  });

  // ✅ IntersectionObserver for grid slide-in
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gridWrapper.classList.add('slide-in');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '0px 0px -5px 0px',
    }
  );

  observer.observe(gridWrapper);
});

*/


// new GSAP animation masking for grid

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.querySelector('.grid-container');
  const gridWrapper = document.querySelector('.grid-wrapper');
  const preview = document.querySelector('.project-preview');
  const previewImage = document.querySelector('.preview-image');

  const projects = [
    {
      title: 'Warrior Met Coal Conveyor',
      image: require('../assets/images/webready/project1.jpg'),
      large: require('../assets/images/webready/project1b.jpg'),
    },
    {
      title: 'Brassfield & Gorrie',
      image: require('../assets/images/webready/project2.jpg'),
      large: require('../assets/images/webready/project2b.jpg'),
    },
    {
      title: 'UAB-Protective Stadium',
      image: require('../assets/images/webready/project3.jpg'),
      large: require('../assets/images/webready/project3b.jpg'),
    },
    {
      title: 'Childrens of Alabama',
      image: require('../assets/images/webready/project4.jpg'),
      large: require('../assets/images/webready/project4b.jpg'),
    },
    {
      title: 'Atlanta Falcons',
      image: require('../assets/images/_DSC0494.jpg'),
      large: require('../assets/images/webready/project5.jpg'),
    },
    {
      title: 'Disney World',
      image: require('../assets/images/webready/project6.jpg'),
      large: require('../assets/images/webready/project6.jpg'),
    },
    {
      title: 'University of Alabama',
      image: require('../assets/images/webready/project7.jpg'),
      large: require('../assets/images/webready/project7.jpg'),
    },
    {
      title: 'University of Auburn',
      image: require('../assets/images/webready/project8.jpg'),
      large: require('../assets/images/webready/project8.jpg'),
    },
    {
      title: 'Warrior Met',
      image: require('../assets/images/webready/project9.jpg'),
      large: require('../assets/images/webready/project9.jpg'),
    },
  ];

  let currentImageSrc = '';
  let previewTimeline;

  // Function to add/remove overlay border sides based on proximity to gridWrapper edges
  function updateOverlayBorders(overlay, container) {
    const overlayRect = overlay.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    overlay.classList.remove('no-top-border', 'no-bottom-border', 'no-left-border', 'no-right-border');

    const threshold = 3; // pixels

    console.log('Overlay Rect:', overlayRect);
    console.log('Container Rect:', containerRect);

    if (Math.abs(overlayRect.top - containerRect.top) <= threshold) {
      overlay.classList.add('no-top-border');
      console.log('Removed top border');
    }
    if (Math.abs(overlayRect.bottom - containerRect.bottom) <= threshold) {
      overlay.classList.add('no-bottom-border');
      console.log('Removed bottom border');
    }
    if (Math.abs(overlayRect.left - containerRect.left) <= threshold) {
      overlay.classList.add('no-left-border');
      console.log('Removed left border');
    }
    if (Math.abs(overlayRect.right - containerRect.right) <= threshold) {
      overlay.classList.add('no-right-border');
      console.log('Removed right border');
    }
  }

  function setupGrid() {
    const screenWidth = window.innerWidth;

    let columns, rows, totalItems;

    if (screenWidth <= 1080) {
      columns = 3;
      totalItems = 9;
    } else if (screenWidth <= 1350) {
      columns = 1;
      totalItems = 4;
    } else if (screenWidth <= 1500) {
      columns = 2;
      totalItems = 10;
    } else {
      columns = 3;
      totalItems = 15;
    }

    rows = Math.ceil(totalItems / columns);

    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;  // Will become 3 at 1080
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let i = 0; i < totalItems; i++) {
      const project = projects[i % projects.length];
      const overlayClass = i % 2 === 0 ? 'overlay even' : 'overlay odd';

      const item = document.createElement('div');
      item.className = 'grid-item';
      item.innerHTML = `
        <img src="${project.image}" alt="${project.title}" />
        <div class="${overlayClass}"><span>${project.title}</span></div>
      `;

      const overlay = item.querySelector('.overlay');

      item.addEventListener('mouseenter', () => {
        if (project.large !== currentImageSrc) {
          currentImageSrc = project.large;

          if (previewTimeline) previewTimeline.kill();

          document.querySelectorAll('.grid-item').forEach(el => {
            el.style.zIndex = '0';
          });

          item.style.zIndex = '20';
          preview.style.zIndex = '10';

          previewTimeline = gsap.timeline({
            defaults: { ease: 'power2.inOut', duration: 0.4 },
          });

          previewTimeline
            .to(preview, {
              clipPath: 'inset(0 100% 0 0)',
              duration: 0.25,
              onComplete: () => {
                previewImage.src = currentImageSrc;
              },
            })
            .to(preview, {
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.5,
            });

          preview.classList.add('show');
        }

        // Update overlay border based on edge proximity
        updateOverlayBorders(overlay, gridWrapper);

        document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('hovered'));
        item.classList.add('hovered');
      });

      item.addEventListener('mouseleave', () => {
        // Remove border adjustment classes on mouse leave
        overlay.classList.remove('no-top-border', 'no-bottom-border', 'no-left-border', 'no-right-border');
      });

      gridContainer.appendChild(item);
    }

    // Mark first row items (optional logic)
    const allItems = gridContainer.querySelectorAll('.grid-item');
    for (let i = 0; i < columns && i < allItems.length; i++) {
      allItems[i].classList.add('first-row');
    }
    // Mark left column items
    for (let i = 0; i < allItems.length; i++) {
      if (i % columns === 0) {
        allItems[i].classList.add('no-left-border');
      }
    }
  }

  setupGrid();
  window.addEventListener('resize', setupGrid);

  gridWrapper.addEventListener('mouseleave', () => {
    if (previewTimeline) previewTimeline.kill();

    previewTimeline = gsap.timeline({
      defaults: { ease: 'power2.in', duration: 0.3 },
      onComplete: () => {
        preview.classList.remove('show');

        // Reset z-index and hovered classes
        document.querySelectorAll('.grid-item').forEach(el => {
          el.style.zIndex = '';
        });
        preview.style.zIndex = '';

        document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('hovered'));
      },
    });

    previewTimeline.to(preview, {
      clipPath: 'inset(0 100% 0 0)', // mask out to left
    });
  });

  /* Grid slide in logic 
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gridWrapper.classList.add('slide-in');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '0px 0px -5px 0px',
    }
  );

  observer.observe(gridWrapper);
  */
});

















// Project copy scroll fade in logic 



document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.project-description-inner');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  if (content) observer.observe(content);
});



//history change year logic 

document.addEventListener("DOMContentLoaded", () => {
  const historyData = [
    {
      year: "1960",
      date: "March 5, 1960",
      image: require('../assets/images/webready/history.jpg'),
      copy: "In 1960, NAFCO began its journey in structural steel fabrication. It began as the first steel fabrication project in Cullman AL on March 5th 1960. The project intailed an order of 200 trusses for a building in Chicago IL.",
    },
    {
      year: "1969",
      date: "April 12, 1969",
      image: require('../assets/images/webready/history2.jpg'),
      copy: "By 1969, we had expanded operations and built a new facility in Cullman AL. This shop continued to grow resulting in facility expansion and aquiring land.  It began as the first steel fabrication project in Cullman AL on March 5th 1960. The project intailed an order of 200 trusses for a building in Chicago IL.",
    },
    {
      year: "1971",
      date: "July 9, 1971",
      image: require('../assets/images/webready/history3.jpg'),
      copy: "This year marked a milestone with our largest project to date. With a hole in our shop due to cancelations there grew a hole in the shop floor needing to be filled. Luckily NAFCO was soon after contacted about supplying steel for the Falcon Stadium in Atlanta, GA.",
    },
    {
      year: "1984",
      date: "October 3, 1984",
      image: require('../assets/images/webready/history4.jpg'),
      copy: "Innovation and automation entered our production line with the purchase of several large scale machines allowing us to service multiple new large scale projects adding to the growth of NAFCO.",
    },
    {
      year: "1992",
      date: "June 17, 1992",
      image: require('../assets/images/webready/history5.jpg'),
      copy: "We reached a new level of excellence in client delivery.With a hole in our shop due to cancelations there grew a hole in the shop floor needing to be filled. Luckily NAFCO was soon after contacted about supplying steel for the Falcon Stadium in Atlanta, GA.",
    },
  ];

  let currentIndex = 0;

  const imageEl = document.querySelector(".history-image");
  const dateEl = document.querySelector(".date-heading");
  const copyEl = document.querySelector(".history-copy");
  const yearEls = document.querySelectorAll(".history-year");

  const updateHistory = () => {
    const entry = historyData[currentIndex];

    imageEl.src = entry.image;
    dateEl.textContent = entry.date;
    copyEl.textContent = entry.copy;

    yearEls.forEach((el, idx) => {
      el.classList.toggle("active", historyData.length - 1 - idx === currentIndex);
    });
  };

  document.querySelector(".history-leftarrow").addEventListener("click", () => {
  // Go forward in history (chronologically)
  currentIndex = (currentIndex + 1) % historyData.length;
  updateHistory();
  });

  document.querySelector(".history-rightarrow").addEventListener("click", () => {
  // Go backward in history (chronologically)
  currentIndex = (currentIndex - 1 + historyData.length) % historyData.length;
  updateHistory();
  });


  // Optional: allow clicking year directly
  yearEls.forEach((el, idx) => {
    el.addEventListener("click", () => {
      currentIndex = historyData.length - 1 - idx;
      updateHistory();
    });
  });

  // Initialize first entry
  updateHistory();
});


// History image Parallax effect

gsap.registerPlugin(ScrollTrigger);

// Parallax effect for the history image
gsap.registerPlugin(ScrollTrigger);

const images = document.querySelectorAll('.history-image');

images.forEach((img) => {
  gsap.to(img, {
    y: '35%',              // parallax movement
    ease: 'none',
    scrollTrigger: {
      trigger: img.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});







// Text Marquee Infinite loop 

document.addEventListener("DOMContentLoaded", function () {
  const marquee = document.getElementById("marqueeText");
  if (!marquee) return;

  const duration = 70000;
  const now = performance.now();
  const elapsed = now % duration;

  marquee.style.animationDelay = `-${elapsed}ms`;
  marquee.style.animationPlayState = "running";
});


// Services Collapsing Info Logic Section

// Services Collapsing Info Logic Section
document.addEventListener('DOMContentLoaded', () => {
  // 🔁 Map data-image strings to require paths
  const imageMap = {
    'thumbnail1.jpg': require('../assets/images/thumbnail1.jpg'),
    'thumbnail2.jpg': require('../assets/images/thumbnail2.jpg'),
    'thumbnail3.jpg': require('../assets/images/thumbnail3.jpg'),
    'thumbnail4.jpg': require('../assets/images/thumbnail4.jpg'),
    'thumbnail5.jpg': require('../assets/images/thumbnail5.jpg'),
  };

  document.querySelectorAll('.learn-more-btn').forEach(button => {
    button.addEventListener('click', () => {
      const serviceItem = button.closest('.service-item');
      if (!serviceItem) return;

      const contentWrapper = serviceItem.querySelector('.service-content-wrapper');
      const contentRight = contentWrapper.querySelector('.content-right');
      const description = contentRight.querySelector('.service-description');
      const serviceHeader = contentRight.querySelector('.service-header');
      const arrow = serviceHeader.querySelector('.arrow');

      const isOpen = serviceItem.classList.contains('open');

      // 👇 Get the filename only (e.g., "thumbnail1.jpg")
      const rawPath = button.dataset.image;
      const fileName = rawPath.split('/').pop();
      const resolvedImage = imageMap[fileName];

      if (!resolvedImage) {
        console.error(`No image found for ${fileName}`);
        return;
      }

      // Check viewport width for mobile breakpoint
      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth <= 420;

      if (!isOpen) {
        description.style.display = 'block';

        if (!isMobile) {
          // Inject or update image only if above mobile breakpoint
          let imgWrapper = contentWrapper.querySelector('.image-wrapper');

          if (!imgWrapper) {
            imgWrapper = document.createElement('div');
            imgWrapper.className = 'image-wrapper';

            const img = document.createElement('img');
            img.src = resolvedImage;
            img.alt = 'Service image';

            const blueOverlay = document.createElement('div');
            blueOverlay.className = 'blue-overlay';

            const lightBlueOverlay = document.createElement('div');
            lightBlueOverlay.className = 'light-blue-overlay';

            imgWrapper.appendChild(img);
            imgWrapper.appendChild(blueOverlay);
            imgWrapper.appendChild(lightBlueOverlay);

            contentWrapper.insertBefore(imgWrapper, contentRight);
          } else {
            const img = imgWrapper.querySelector('img');
            if (img) img.src = resolvedImage;
          }

          imgWrapper.style.display = 'block';
          imgWrapper.classList.remove('reveal');
          void imgWrapper.offsetWidth;
          imgWrapper.classList.add('reveal');
        }

        arrow.classList.add('rotated');
        button.textContent = 'Close';
        serviceItem.classList.add('open');
      } else {
        description.style.display = 'none';

        const imgWrapper = contentWrapper.querySelector('.image-wrapper');
        if (imgWrapper) {
          imgWrapper.style.display = 'none';
          imgWrapper.classList.remove('reveal');
        }

        arrow.classList.remove('rotated');
        button.textContent = 'Learn More';
        serviceItem.classList.remove('open');
      }
    });
  });
});


//Statistic Counter Animation Logic 

 document.addEventListener("DOMContentLoaded", () => {
  const statSection = document.querySelector('.stats-column');
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  // Helper: count up number
  function animateCount(el, endValue) {
    const duration = 1000;
    const plusSign = /\+$/.test(endValue);
    const is24_7 = endValue.includes("24/7");

    if (is24_7) {
      el.textContent = "24/7"; // skip animation
      return;
    }

    const numberOnly = parseInt(endValue.replace(/\D/g, ''), 10);
    const startTime = performance.now();

    function update(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * numberOnly);
      el.textContent = current.toLocaleString() + (plusSign ? '+' : '');
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;

        // Add .visible class
        statSection.classList.add('visible');

        // Start animations
        statNumbers.forEach(el => animateCount(el, el.textContent));
      }
    });
  }, { threshold: 0.3 });

  // Only observe if section exists
  if (statSection) {
    observer.observe(statSection);
  }
});




// Stats, Awards, and License section with photo transition logic


function transitionToNextSlide() {
  const current = slides[currentIndex];
  const nextIndex = (currentIndex + 1) % slides.length;
  const next = slides[nextIndex];

  current.classList.remove("active");
  current.classList.add("zoom-out");

  next.classList.add("zoom-in");

  // 🧼 Instead of offsetHeight, use requestAnimationFrame to wait one frame
  requestAnimationFrame(() => {
    next.classList.add("animate-in");
  });

  setTimeout(() => {
    current.classList.remove("zoom-out");
    next.classList.remove("zoom-in", "animate-in");
    next.classList.add("active");

    title.textContent = next.dataset.title;

    ticks.forEach((tick, i) =>
      tick.classList.toggle("active", i === nextIndex)
    );

    currentIndex = nextIndex;
  }, 700);
}



// stats toggle content change logic 


  // Stats section card slider logic 

  document.addEventListener('DOMContentLoaded', () => {
  console.log("Slider JS loaded ✅");
  const sliderButton = document.getElementById('sliderRightButton');
  const sliderTrack = document.getElementById('customSliderTrack');
  const sliderControls = document.querySelector('.slider-controls');

  console.log({ sliderButton, sliderTrack, sliderControls });

  let isDragging = false;
  let startX;
  let startLeft;

  let controlWidth;
  let buttonWidth;
  let maxLeft;

  function updateSizes() {
    controlWidth = sliderControls.offsetWidth;
    buttonWidth = sliderButton.offsetWidth;
    maxLeft = controlWidth - buttonWidth;
  }

  updateSizes();
  window.addEventListener('resize', updateSizes);

  // Start drag
  sliderButton.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startLeft = parseFloat(sliderButton.style.left) || 0;
    document.body.style.userSelect = 'none';
  });

  // Drag move
  let animationFrame;

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    if (animationFrame) cancelAnimationFrame(animationFrame);

  animationFrame = requestAnimationFrame(() => {
    const dx = e.clientX - startX;
    let newLeft = startLeft + dx;

    newLeft = Math.max(0, Math.min(maxLeft, newLeft)); // Clamp
    sliderButton.style.left = `${newLeft}px`;

    const scrollRatio = newLeft / maxLeft;
    const maxScroll = sliderTrack.scrollWidth - sliderTrack.clientWidth;
    sliderTrack.scrollLeft = scrollRatio * maxScroll;
    });
  });

  // End drag
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.userSelect = '';
    }
  });
});



