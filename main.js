// 1. Typed animation
var typed = new Typed(".text", {
  strings: ["Web Developer", "Python Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

// 2. Navbar hide on scroll
const nav = document.querySelector('.navlist');
window.addEventListener('scroll', () => {
  const homeSection = document.getElementById('home');
  if (!homeSection) return;
  const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
  nav.style.display = (window.scrollY >= homeBottom - 50) ? 'none' : 'flex';
});

// 3. Animate Professional Skills (radial bars)
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
        const interval = setInterval(() => {
          percentageText.textContent = count + "%";
          if (count >= percentage) clearInterval(interval);
          else count++;
        }, 30);

        radialObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".radial-bars").forEach(bar => radialObserver.observe(bar));
});

// 4. Animate section headings on scroll
document.addEventListener("DOMContentLoaded", () => {
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

        let text = line.querySelector(".progress-percent");
        if (!text) {
          text = document.createElement("div");
          text.classList.add("progress-percent");
          line.appendChild(text);
        }

        span.style.width = percent + "%";

        let count = 0;
        const interval = setInterval(() => {
          if (count >= percent) clearInterval(interval);
          else {
            count++;
            text.textContent = count + "%";
          }
        }, 20);

        text.style.opacity = 1;
        observer.unobserve(line);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".progress-line").forEach(line => observer.observe(line));
});

// 6. Theme toggle
const toggle = document.getElementById('theme-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    toggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
  });
}

// 7. Overlay menu toggle and smooth scroll
const menuBtn = document.getElementById('menu-btn');
const overlayMenu = document.getElementById('overlay-menu');

if (menuBtn && overlayMenu) {
  // Open overlay
  menuBtn.addEventListener('click', () => {
    overlayMenu.style.display = 'flex';
  });

  // Close and scroll smoothly when clicking a link
  overlayMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      // hide overlay menu after clicking
      overlayMenu.style.display = 'none';
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const overlayMenu = document.getElementById('overlay-menu');
  const closeBtn = document.querySelector('.overlay-menu .close-btn');

  if (!overlayMenu || !closeBtn) return;

  // Close overlay on button click
  closeBtn.addEventListener('click', () => {
    overlayMenu.style.display = 'none';
  });
});
// AOS Scroll Animations Initialize
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,     // animation speed
    offset: 120,       // trigger point
    easing: "ease-in-out",
    once: true,        // animate only once
  });
});




