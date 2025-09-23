// 1. Typed animation
var typed = new Typed(".text", {
  strings: ["Web Developer", "Python Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

// 2. Navbar hide
const nav = document.querySelector('.navlist');
window.addEventListener('scroll', () => {
  const homeSection = document.getElementById('home');
  const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
  nav.style.display = (window.scrollY >= homeBottom - 50) ? 'none' : 'flex';
});

// Animate Professional Skills (radial) on scroll
document.addEventListener("DOMContentLoaded", () => {
  const radialObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const path = bar.querySelector('.path');
        const percentageText = bar.querySelector('.percentage');
        const percentage = parseInt(percentageText.getAttribute('data-percent'));

        const radius = 80;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (circumference * (percentage / 100));

        path.style.strokeDasharray = circumference;
        path.style.strokeDashoffset = circumference;

        setTimeout(() => {
          path.style.transition = "stroke-dashoffset 3.5s ease";
          path.style.strokeDashoffset = offset;
        }, 100);

        let count = 0;
        let interval = setInterval(() => {
          percentageText.textContent = count + "%";
          if (count >= percentage) clearInterval(interval);
          else count++;
        }, 30);

        radialObserver.unobserve(bar); // Once animated, stop observing
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".radial-bars").forEach(bar => {
    radialObserver.observe(bar);
  });
});


// 4. Animate section headings on scroll
document.addEventListener("DOMContentLoaded", function () {
  const headings = document.querySelectorAll(".animate-heading");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  headings.forEach(heading => observer.observe(heading));
});

// 5. Animate Technical Skills (linear bars)
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const line = entry.target;
        const span = line.querySelector("span");
        const percent = parseInt(line.getAttribute("data-percent"));

        // Check if progress-percent exists, else create it
        let text = line.querySelector(".progress-percent");
        if (!text) {
          text = document.createElement("div");
          text.classList.add("progress-percent");
          line.appendChild(text);
        }

        // Animate bar
        span.style.width = percent + "%";

        // Animate % text only once
        let count = 0;
        const interval = setInterval(() => {
          if (count >= percent) {
            clearInterval(interval);
          } else {
            count++;
            text.textContent = count + "%";
          }
        }, 20);

        // Show text
        text.style.opacity = 1;

        // Unobserve so it doesn't run again
        observer.unobserve(line);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".progress-line").forEach(line => {
    observer.observe(line);
  });
});


const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  // Change button icon
  toggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});
