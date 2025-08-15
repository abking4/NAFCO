
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


// new hero headline animation

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
    let rows = 4;

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
      console.log('Button clicked:', button);

      const serviceItem = button.closest('.service-item');
      if (!serviceItem) {
        console.error('No service-item found');
        return;
      }

      const contentWrapper = serviceItem.querySelector('.service-content-wrapper');
      const contentRight = contentWrapper.querySelector('.content-right');
      const description = contentRight.querySelector('.service-description');
      const serviceHeader = contentRight.querySelector('.service-header');
      const arrow = serviceHeader.querySelector('.arrow');

      const isOpen = serviceItem.classList.contains('open');
      console.log('Is open?', isOpen);

      // 👇 Get the filename only (e.g., "thumbnail1.jpg")
      const rawPath = button.dataset.image;
      const fileName = rawPath.split('/').pop();
      const resolvedImage = imageMap[fileName];

      if (!resolvedImage) {
        console.error(`No image found for ${fileName}`);
        return;
      }

      if (!isOpen) {
        description.style.display = 'block';

        let imgWrapper = contentWrapper.querySelector('.image-wrapper');

        if (!imgWrapper) {
          console.log('Creating image wrapper');
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



