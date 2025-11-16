// =====================
// 1. Typed Animation
// =====================
var typed = new Typed(".text", {
  strings: ["Web Developer", "Python Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

document.addEventListener("DOMContentLoaded", () => {

  // =====================================================
  // Navbar hide on scroll
  // =====================================================
  const nav = document.querySelector('.navlist');
  const homeSection = document.getElementById('home');

  if (nav && homeSection) {
    window.addEventListener('scroll', () => {
      const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
      nav.style.display = (window.scrollY >= homeBottom - 50) ? 'none' : 'flex';
    });
  }

  // =====================================================
  // Radial Professional Skills Animation
  // =====================================================
  const radialObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const path = bar.querySelector('.path');
      const text = bar.querySelector('.percentage');
      const percent = parseInt(text.dataset.percent);
      const radius = 80;
      const circ = 2 * Math.PI * radius;
      const offset = circ - (circ * percent / 100);

      path.style.strokeDasharray = circ;
      path.style.strokeDashoffset = circ;

      setTimeout(() => {
        path.style.transition = "stroke-dashoffset 3.5s ease";
        path.style.strokeDashoffset = offset;
      }, 150);

      let x = 0;
      const countInterval = setInterval(() => {
        text.textContent = x + "%";
        if (x >= percent) clearInterval(countInterval);
        x++;
      }, 30);

      radialObserver.unobserve(bar);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".radial-bars").forEach(bar => radialObserver.observe(bar));

  // =====================================================
  // Section Heading Animation
  // =====================================================
  const headingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        headingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll(".animate-heading").forEach(h => headingObserver.observe(h));

  // =====================================================
  // Technical Skills (Linear Bars)
  // =====================================================
  const linearObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const line = entry.target;
      const span = line.querySelector("span");
      const percent = parseInt(line.dataset.percent);
      let txt = line.querySelector(".progress-percent");
      if (!txt) {
        txt = document.createElement("div");
        txt.classList.add("progress-percent");
        line.appendChild(txt);
      }

      span.style.width = percent + "%";

      let val = 0;
      const interval = setInterval(() => {
        if (val >= percent) clearInterval(interval);
        txt.textContent = val + "%";
        val++;
      }, 20);

      txt.style.opacity = 1;

      linearObserver.unobserve(line);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".progress-line").forEach(line => linearObserver.observe(line));

  // =====================================================
  // Theme Toggle
  // =====================================================
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      toggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
  }

  // =====================================================
  // Overlay Menu Open & Smooth Scroll
  // =====================================================
  const menuBtn = document.getElementById('menu-btn');
  const overlayMenu = document.getElementById('overlay-menu');
  const closeBtn = document.querySelector('.overlay-menu .close-btn');

  if (menuBtn && overlayMenu) {
    menuBtn.addEventListener('click', () => {
      overlayMenu.style.display = 'flex';
    });
  }

  if (overlayMenu) {
    overlayMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) target.scrollIntoView({ behavior: 'smooth' });
        overlayMenu.style.display = 'none';
      });
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlayMenu.style.display = 'none';
    });
  }

  // =====================================================
  // Service Boxes Click (Highlight + Show Details)
  // =====================================================
  document.querySelectorAll('.service-box .read').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const box = btn.closest('.service-box');
      const targetId = btn.getAttribute('href').substring(1);
      const detailBox = document.getElementById(targetId);

      // Highlight clicked service box
      document.querySelectorAll('.service-box').forEach(b => b.classList.remove('active'));
      box.classList.add('active');

      // Show related details box
      document.querySelectorAll('.details-box').forEach(d => d.classList.remove('active'));
      if(detailBox) detailBox.classList.add('active');

      // Scroll into view smoothly on mobile
      if(detailBox) detailBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // =====================================================
  // AOS Initialize
  // =====================================================
  AOS.init({
    duration: 800,
    offset: 120,
    easing: "ease-in-out",
    once: true
  });

});
