// Typed Text Animation (हे तुमचं असंच राहील)
var typed = new Typed(".text", {
  strings: ["Web Developer", "Python Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

// Hide navlist on scroll past home section
const nav = document.querySelector('.navlist');

window.addEventListener('scroll', () => {
  const homeSection = document.getElementById('home');
  const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;

  if (window.scrollY >= homeBottom - 50) {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'flex';
  }
});

window.addEventListener("load", () => {
  const bars = document.querySelectorAll('.radial-bars');

  bars.forEach((bar) => {
    const path = bar.querySelector('.path');
    const percentageText = bar.querySelector('.percentage');
    const percentage = parseInt(percentageText.getAttribute('data-percent'));

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (circumference * (percentage / 100));

    // Initial setup (no animation)
    path.style.strokeDasharray = circumference;
    path.style.strokeDashoffset = circumference;
    path.style.transition = "none";

    // Animate after delay
    setTimeout(() => {
      path.style.transition = "stroke-dashoffset 3.5s ease";
      path.style.strokeDashoffset = offset;
    }, 100);

    // Percentage text counter
    let count = 0;
    let interval = setInterval(() => {
      percentageText.textContent = count + "%";
      if (count >= percentage) {
        clearInterval(interval);
      } else {
        count++;
      }
    }, 30);
  });
});
 