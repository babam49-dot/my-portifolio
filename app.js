/* 
  Tewanay Zewudu Portfolio JS
  Interactive Physics, Canvas background, Cursor, and Animations
*/

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Custom Cursor
  initCustomCursor();
  
  // Initialize Canvas Grid Background
  initCanvasGrid();
  
  // Initialize Skills Section Tabs & Bubbles Redesign
  initSkillsV2();
  
  // Initialize Journey Tab Switching
  initJourneyTabs();
  
  // Initialize Testimonial Carousel
  initTestimonialCarousel();
  
  // Initialize Header Scroll Effect & Scroll Navigation Highlights
  initHeaderAndScroll();
  
  // Initialize Contact Form Actions
  initContactForm();
  
  // Initialize GSAP scroll animations
  initGsapAnimations();

  // Initialize Photo Parallax Mouse Effect
  initPhotoParallax();

  // Initialize Hero Section Parallax Gaze Effect
  initHeroParallax();


});

/* ==========================================================================
   0. Photo Parallax Mouse Movement Effect (About Section Card)
   ========================================================================== */
function initPhotoParallax() {
  const wrap = document.getElementById('photo-parallax');
  if (!wrap) return;

  const section = document.getElementById('about');
  const strength = 18; // degrees of tilt max

  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    // Normalized -1 to +1 relative to section center
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    const rotateY = nx * strength;
    const rotateX = -ny * strength * 0.6;
    const translateX = nx * 8;
    const translateY = ny * 5;

    wrap.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${translateX}px, ${translateY}px)`;
  });

  section.addEventListener('mouseleave', () => {
    wrap.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translate(0,0)';
  });
}

/* ==========================================================================
   0.1. Hero Section Parallax Background Gaze Effect
   ========================================================================== */
function initHeroParallax() {
  const heroImg = document.querySelector('.hero-bg-photo');
  const heroSection = document.getElementById('home');
  if (!heroImg || !heroSection) return;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    // Shift image slightly in opposite direction to simulate gaze tracking
    const dx = nx * -40; // max shift range in px
    const dy = ny * -25;
    heroImg.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.05)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    heroImg.style.transform = 'translate3d(0, 0, 0) scale(1)';
  });
}


/* ==========================================================================
   1. Custom Cursor with Inertial Lag
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (!cursor || !cursorDot) return;
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  // Lerp coefficient for smooth inertia
  const lerp = 0.15;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot instantly follows the cursor
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });
  
  function animateCursor() {
    // Linear Interpolation for cursor ring
    cursorX += (mouseX - cursorX) * lerp;
    cursorY += (mouseY - cursorY) * lerp;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Hover effect states
  const hoverElements = document.querySelectorAll('a, button, .btn, .project-row, .arrow-btn, .toy-pill, .tab-btn, .hero-huge-text');
  
  hoverElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    elem.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
}

/* ==========================================================================
   2. Interactive Grid Background Canvas
   ========================================================================== */
function initCanvasGrid() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  let mouse = { x: null, y: null, radius: 180 };
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  function drawGrid() {
    ctx.clearRect(0, 0, width, height);
    
    const gridSize = 65; // Size of grid squares
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.lineWidth = 1;
    
    // Draw columns
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Draw rows
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    

    
    requestAnimationFrame(drawGrid);
  }
  
  drawGrid();
}

/* ==========================================================================
   3. Interactive Skills Tabs & Bubbles Switcher
   ========================================================================== */
function initSkillsV2() {
  const items = document.querySelectorAll('.discipline-item');
  const groups = document.querySelectorAll('.skills-bubble-group');
  if (items.length === 0 || groups.length === 0) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      // Deactivate all items
      items.forEach(i => i.classList.remove('active'));
      // Activate selected
      item.classList.add('active');

      const index = item.getAttribute('data-index');

      // Deactivate all groups
      groups.forEach(g => g.classList.remove('active'));
      // Activate matching group
      const matchingGroup = document.querySelector(`.skills-bubble-group[data-group="${index}"]`);
      if (matchingGroup) {
        matchingGroup.classList.add('active');
      }
    });
  });
}


/* ==========================================================================
   4. Journey Tabs switcher (Experience vs Education)
   ========================================================================== */
function initJourneyTabs() {
  const tabs = document.querySelectorAll('.journey-tabs .tab-btn');
  const sections = {
    experience: document.getElementById('tab-experience'),
    education: document.getElementById('tab-education')
  };
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const target = tab.dataset.tab;
      
      Object.keys(sections).forEach(key => {
        if (sections[key]) {
          if (key === target) {
            sections[key].style.display = 'block';
            // Animation via GSAP if loaded
            if (window.gsap) {
              gsap.fromTo(sections[key].children, 
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }
              );
            }
          } else {
            sections[key].style.display = 'none';
          }
        }
      });
    });
  });
  
  // Initially show only experience
  if (sections.education) sections.education.style.display = 'none';
}

/* ==========================================================================
   5. Testimonial Carousel Slider
   ========================================================================== */
function initTestimonialCarousel() {
  const slides = document.querySelectorAll('.testi-card');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const currentNum = document.getElementById('carousel-current');
  const totalNum = document.getElementById('carousel-total');
  
  if (slides.length === 0) return;
  
  let currentIndex = 0;
  
  // Set total counter
  if (totalNum) {
    totalNum.textContent = String(slides.length).padStart(2, '0');
  }
  
  function updateCarousel(newIndex, direction = 'next') {
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;
    
    slides.forEach(slide => {
      slide.classList.remove('active', 'slide-in-right', 'slide-in-left');
    });
    
    const animationClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
    slides[newIndex].classList.add('active', animationClass);
    
    currentIndex = newIndex;
    
    if (currentNum) {
      currentNum.textContent = String(currentIndex + 1).padStart(2, '0');
    }
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1, 'prev'));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1, 'next'));
  }

  // Auto-advance every 5 seconds
  setInterval(() => updateCarousel(currentIndex + 1, 'next'), 5000);
}


/* ==========================================================================
   6. Header scroll styling & menu active highlights
   ========================================================================== */
function initHeaderAndScroll() {
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu-links a, .footer-links-v2 a');
  
  // Header scroll glow activation
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Scroll active link detection
    let currentActive = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 120) {
        currentActive = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentActive}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Mobile Hamburg Menu Toggle
  const menuBtn = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      menuBtn.classList.toggle('open');
      
      // Animate lines to close X shape
      const lines = menuBtn.querySelectorAll('span');
      if (menuBtn.classList.contains('open')) {
        lines[0].style.transform = 'translateY(8px) rotate(45deg)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
      }
    });
    
    // Auto-close menu on link clicks
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuBtn.classList.remove('open');
        menuBtn.querySelectorAll('span').forEach(line => line.style.transform = 'none');
        menuBtn.querySelectorAll('span')[1].style.opacity = '1';
      });
    });
  }
}

/* ==========================================================================
   7. Form Actions and Submission Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  const statusEl = document.querySelector('.form-status');
  
  if (!form || !statusEl) return;
  
  form.addEventListener('submit', (e) => {
    const name = form.querySelector('#form-name').value.trim();
    const email = form.querySelector('#form-email').value.trim();
    const message = form.querySelector('#form-message').value.trim();
    const btn = form.querySelector('button[type="submit"]');
    
    if (!name || !email || !message) {
      e.preventDefault();
      statusEl.className = 'form-status error';
      statusEl.textContent = 'Please fill out all fields.';
      statusEl.style.display = 'block';
      return;
    }
    
    const originalText = btn.innerHTML;
    
    // Fallback: If running from file:// protocol, AJAX is blocked by CORS.
    // Let standard HTML post submission redirect to FormSubmit.
    if (window.location.protocol === 'file:') {
      btn.disabled = true;
      btn.innerHTML = 'Redirecting...';
      return; 
    }
    
    e.preventDefault();
    btn.disabled = true;
    btn.innerHTML = 'Sending Message...';
    statusEl.style.display = 'none';
    
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData);
    
    // Real API Submission using FormSubmit.co AJAX
    fetch('https://formsubmit.co/ajax/tewanayzewudu49@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      
      if (data.success === 'true' || data.success === true) {
        statusEl.className = 'form-status success';
        statusEl.textContent = 'Thank you! Your message has been sent successfully.';
        statusEl.style.display = 'block';
        form.reset();
      } else {
        statusEl.className = 'form-status error';
        statusEl.textContent = 'Oops! Something went wrong. Please try again.';
        statusEl.style.display = 'block';
      }
      
      // Make alert disappear after 5s
      setTimeout(() => {
        statusEl.style.display = 'none';
      }, 5000);
    })
    .catch(error => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      statusEl.className = 'form-status error';
      statusEl.textContent = 'Connection error. Please try again.';
      statusEl.style.display = 'block';
      
      setTimeout(() => {
        statusEl.style.display = 'none';
      }, 5000);
    });
  });
}

/* ==========================================================================
   8. GSAP Scroll Animations
   ========================================================================== */
function initGsapAnimations() {
  // Check if GSAP and ScrollTrigger are loaded via CDN
  if (!window.gsap || !window.ScrollTrigger) return;
  
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero reveal animations
  gsap.fromTo('.hero-huge-text span', 
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', stagger: 0.15 }
  );
  
  gsap.fromTo('.hero-bottom',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
  );
  
  // Generic fade-in-up animations for sections
  const fadeUpElems = document.querySelectorAll('.about-left, .about-profile-wrap, .journey-tabs, .timeline, .stats-grid, .skills-text-wrap, .toybox-section-title, .toybox-container, .testimonials-wrapper, .contact-info-wrap, .contact-form');
  
  fadeUpElems.forEach(elem => {
    gsap.fromTo(elem,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
  
  // Projects item row stagger slide animations
  const projectRows = document.querySelectorAll('.project-row');
  projectRows.forEach(row => {
    gsap.fromTo(row,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}
