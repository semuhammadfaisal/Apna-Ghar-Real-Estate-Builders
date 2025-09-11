// Mobile Navbar Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Name validation
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (!name.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    } else {
      nameError.textContent = '';
    }

    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      emailError.textContent = 'Please enter your email.';
      valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    // Message validation
    const message = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    if (!message.value.trim()) {
      messageError.textContent = 'Please enter your message.';
      valid = false;
    } else {
      messageError.textContent = '';
    }

    // Show success message if valid
    const formSuccess = document.getElementById('formSuccess');
    if (valid) {
      formSuccess.textContent = 'Thank you for contacting us! We will get back to you soon.';
      formSuccess.style.display = 'block';
      contactForm.reset();
      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    } else {
      formSuccess.textContent = '';
      formSuccess.style.display = 'none';
    }
  });
}

// Dynamic Navbar & Footer Loader
function loadComponent(id, url, callback) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    });
}

// Count-up Animation for Stats
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + '+';
  }, 16);
}

// Intersection Observer for Stats Animation
function initStatsAnimation() {
  const statsSection = document.querySelector('.mobile-hero-stats');
  if (!statsSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statCards = entry.target.querySelectorAll('.mobile-stat-card');
        
        statCards.forEach((card, index) => {
          const statValue = card.querySelector('.stat-value');
          const targetCount = parseInt(statValue.getAttribute('data-count'));
          
          // Add staggered animation delay
          setTimeout(() => {
            card.classList.add('animate');
            animateCounter(statValue, targetCount, 1500 + (index * 200));
          }, index * 150);
        });
        
        // Unobserve after animation starts
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  });
  
  observer.observe(statsSection);
}

window.addEventListener('DOMContentLoaded', function() {
  // Existing content animation fix
  document.querySelectorAll('.company-intro, .ceo-section, .we-deal-in').forEach(function(el) {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
  
  // Initialize stats animation
  initStatsAnimation();
  

});

document.addEventListener('DOMContentLoaded', function () {
  // Load Navbar
  loadComponent('navbar', 'navbar.html', function() {
    // Re-attach menu toggle after navbar is loaded
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }
  });
  // Load Footer
  loadComponent('footer', 'footer.html');

  // Initialize counter animations
  initCounterAnimations();
});

// Counter Animation Function
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };

    updateCounter();
  };

  // Intersection Observer for triggering animations when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        animateCounter(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Testimonials Carousel Functionality
let currentSlideIndex = 1;
let autoSlideInterval;

// Show specific slide
function showSlide(n) {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');

  if (n > slides.length) { currentSlideIndex = 1; }
  if (n < 1) { currentSlideIndex = slides.length; }

  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  // Remove active class from all dots
  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  // Show current slide and activate corresponding dot
  if (slides[currentSlideIndex - 1]) {
    slides[currentSlideIndex - 1].classList.add('active');
  }
  if (dots[currentSlideIndex - 1]) {
    dots[currentSlideIndex - 1].classList.add('active');
  }
}

// Navigate to specific slide (called by dots)
function currentSlide(n) {
  currentSlideIndex = n;
  showSlide(currentSlideIndex);
  resetAutoSlide();
}

// Change slide (called by arrow buttons)
function changeSlide(direction) {
  currentSlideIndex += direction;
  showSlide(currentSlideIndex);
  resetAutoSlide();
}

// Make functions globally accessible
window.currentSlide = currentSlide;
window.changeSlide = changeSlide;

// Auto-advance functionality
function autoAdvance() {
  currentSlideIndex++;
  showSlide(currentSlideIndex);
}

// Reset auto-slide timer
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(autoAdvance, 5000); // Auto-advance every 5 seconds
}

// Touch/Swipe support for mobile
function addTouchSupport() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;

  let startX = 0;
  let endX = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        changeSlide(1);
      } else {
        // Swipe right - previous slide
        changeSlide(-1);
      }
    }
  }
}

// Keyboard navigation support
function addKeyboardSupport() {
  document.addEventListener('keydown', (e) => {
    const carousel = document.querySelector('.testimonials-carousel-container');
    if (!carousel) return;

    // Check if carousel is in viewport
    const rect = carousel.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          changeSlide(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          changeSlide(1);
          break;
      }
    }
  });
}

// Pause auto-advance when user hovers over carousel
function addHoverPause() {
  const carousel = document.querySelector('.testimonials-carousel-container');
  if (!carousel) return;

  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  carousel.addEventListener('mouseleave', () => {
    resetAutoSlide();
  });
}

// Add event listeners for navigation
function addEventListeners() {
  // Next button event listener
  const nextBtn = document.getElementById('nextBtn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => changeSlide(1));
  }

  // Dot navigation event listeners
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideNumber = parseInt(dot.getAttribute('data-slide'));
      currentSlide(slideNumber);
    });
  });
}

// Initialize testimonials carousel
function initTestimonialsCarousel() {
  // Add event listeners first
  addEventListeners();

  // Show first slide
  showSlide(currentSlideIndex);

  // Start auto-advance
  resetAutoSlide();

  // Add touch support for mobile
  addTouchSupport();

  // Add keyboard navigation
  addKeyboardSupport();

  // Add hover pause functionality
  addHoverPause();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit for all elements to be ready
  setTimeout(() => {
    initTestimonialsCarousel();
  }, 100);
});

// Also initialize when window loads (fallback)
window.addEventListener('load', function() {
  if (document.querySelector('.testimonial-slide')) {
    initTestimonialsCarousel();
  }
});

