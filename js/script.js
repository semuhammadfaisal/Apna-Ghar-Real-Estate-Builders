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

window.addEventListener('DOMContentLoaded', function() {
  // Existing content animation fix
  document.querySelectorAll('.company-intro, .ceo-section, .we-deal-in').forEach(function(el) {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });

  // Floating button animation fix
  document.querySelectorAll('.floating-btn').forEach(function(el) {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
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
}); 