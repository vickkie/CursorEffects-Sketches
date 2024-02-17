import { preloadImages } from "./utils.js";

// Variable to store the Lenis smooth scrolling object
let lenis;

// Selecting DOM elements

const contentElements = [...document.querySelectorAll(".content--sticky")];
const totalContentElements = contentElements.length;

// Initializes Lenis for smooth scrolling with specific properties
const initSmoothScrolling = () => {
  // Instantiate the Lenis object with specified properties
  lenis = new Lenis({
    lerp: 0.2, // Lower values create a smoother scroll effect
    smoothWheel: true, // Enables smooth scrolling for mouse wheel events
  });

  // Update ScrollTrigger each time the user scrolls
  lenis.on("scroll", () => ScrollTrigger.update());

  // Define a function to run at each animation frame
  const scrollFn = (time) => {
    lenis.raf(time); // Run Lenis' requestAnimationFrame method
    requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
  };
  // Start the animation frame loop
  requestAnimationFrame(scrollFn);
};

// Function to handle scroll-triggered animations
const scroll = () => {
  contentElements.forEach((el, position) => {
    const isLast = position === totalContentElements - 1;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      })
      .to(
        el,
        {
          ease: "none",
          startAt: { filter: "brightness(100%)" },
          filter: isLast ? "none" : "brightness(50%)",
          scale: 0.95,
          borderRadius: 40,
        },
        0
      );
  });
};

// Initialization function
const init = () => {
  initSmoothScrolling(); // Initialize Lenis for smooth scrolling
  scroll(); // Apply scroll-triggered animations
};

preloadImages(".content__img").then(() => {
  // Once images are preloaded, remove the 'loading' indicator/class from the body
  document.body.classList.remove("loading");
  init();
});

//my shit

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Define the start and end values
const startValue = 0;
const endValue = 29;

// Find the element to update
const countElement = document.getElementById("count");

let scrolltimeline = gsap.timeline();

scrolltimeline
  .to(".total", {
    innerHTML: "/29",
  })
  .to("#count", {
    innerHTML: "01",
  });

function reverseit() {
  let reversetimeline = gsap.timeline();

  reversetimeline.to("#count", {
    innerHTML: "➺",
  });
}

// Creating ScrollTrigger inside the timeline
scrolltimeline.add(
  ScrollTrigger.create({
    trigger: ".wrap",
    start: "top 80%",
    animation: scrolltimeline,
    onLeaveBack: () => {
      scrolltimeline.reverse();
      reverseit();
    },
  })
);

// Function to update the count
function updateCount(value) {
  countElement.textContent = value.toString().padStart(2, "0");
}

// Function to update count on scroll
function updateCountOnScroll() {
  // Calculate the current scroll progress based on window height and scroll position
  const windowHeight = window.innerHeight;
  const scrollPosition = window.pageYOffset;
  const scrollHeight = document.documentElement.scrollHeight - windowHeight;
  const progress = (scrollPosition / scrollHeight) * 100;

  // Map the progress to the range of startValue to endValue
  const currentValue = Math.round((progress / 100) * (endValue - startValue) + startValue);

  // Update the count
  updateCount(currentValue);
}

// Set up ScrollTrigger
ScrollTrigger.create({
  trigger: ".wrap",
  start: "top top",
  end: "bottom bottom",
  markers: !1,
  onUpdate: () => {
    updateCountOnScroll();
  },
  scrub: true, // smooth animation during scroll
  toggleActions: "play none none none",
});
