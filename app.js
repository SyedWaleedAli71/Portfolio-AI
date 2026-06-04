// ============================================
//  NAVBAR - Scroll Effect & Mobile Menu
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ============================================
//  ACTIVE NAV LINK on scroll
// ============================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = '';
    link.style.fontWeight = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#fff';
      link.style.fontWeight = '500';
    }
  });
});

// ============================================
//  SKILLS TABS FILTER
// ============================================
const tabBtns = document.querySelectorAll('.tab-btn');
const skillCards = document.querySelectorAll('.skill-icon-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active tab
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    skillCards.forEach(card => {
      if (card.getAttribute('data-cat') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ============================================
//  FADE-UP ANIMATION (IntersectionObserver)
// ============================================
const fadeEls = document.querySelectorAll(
  '.service-card, .skill-item, .project-card, .stat-card, .about-text, .about-img, .contact-item'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (i % 4));
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ============================================
//  COUNTER ANIMATION (Stats)
// ============================================
function animateCounter(el, target, suffix) {
  let count = 0;
  const step = Math.ceil(target / 50);
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = count + suffix;
  }, 30);
}

const statNums = document.querySelectorAll('.stat-num');
let countersStarted = false;

const statObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    statNums.forEach(el => {
      const raw = el.textContent.trim();
      const num = parseInt(raw);
      const suffix = raw.replace(num, '');
      animateCounter(el, num, suffix);
    });
  }
}, { threshold: 0.5 });

if (statNums.length > 0) {
  statObserver.observe(statNums[0].closest('.stats-row'));
}

// ============================================
//  CONTACT FORM - Simple Validation
// ============================================
const contactBtn = document.querySelector('.contact-form .btn-primary');

if (contactBtn) {
  contactBtn.addEventListener('click', (e) => {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    let valid = true;

    inputs.forEach(input => {
      input.style.borderColor = '';
      if (!input.value.trim()) {
        input.style.borderColor = '#e74c3c';
        valid = false;
      }
    });

    if (valid) {
      contactBtn.textContent = '✓ Message Sent!';
      contactBtn.style.background = '#27ae60';
      setTimeout(() => {
        contactBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        contactBtn.style.background = '';
        inputs.forEach(input => input.value = '');
      }, 3000);
    }
  });
}

// ============================================
//  SMOOTH SCROLL for all anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});




























function sendMessage() {
  const inputs = document.querySelectorAll(".form-group input, .form-group textarea");

  let valid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderBottom = "2px solid red";
      valid = false;
    } else {
      input.style.borderBottom = "1px solid rgba(255,255,255,0.3)";
    }
  });

  if (valid) {
    alert("Message Sent Successfully ✅");

    inputs.forEach(input => input.value = "");
  }
}