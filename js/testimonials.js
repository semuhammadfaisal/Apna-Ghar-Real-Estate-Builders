let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  
  currentSlide = (n + slides.length) % slides.length;
  
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

// Auto-advance every 5 seconds
setInterval(nextSlide, 5000);

// Initialize first slide
if (slides.length > 0) {
  slides[0].classList.add('active');
  dots[0].classList.add('active');
}