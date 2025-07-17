// === MAIN SLIDER FUNCTIONALITY ===
class MainSlider {
  constructor(sliderId) {
    this.slider = document.getElementById(sliderId);
    this.totalSlides = this.slider.children.length;
    this.currentIndex = 0;
    this.autoSlideInterval = null;
    this.init();
  }

  init() {
    this.startAutoSlide();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateSliderPosition();
  }

  updateSliderPosition() {
    this.slider.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  restart() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}

// === OFFICIALS SLIDER FUNCTIONALITY ===
class OfficialsSlider {
  constructor(sliderId, dotsId) {
    this.slider = document.getElementById(sliderId);
    this.dotsContainer = document.getElementById(dotsId);
    this.slides = this.slider.children;
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;
    this.autoSlideInterval = null;
    this.autoSlideDelay = 5000;
    this.init();
  }

  init() {
    this.createDots();
    this.updateSlider();
    this.startAutoSlide();
    this.addEventListeners();
  }

  createDots() {
    this.dotsContainer.innerHTML = '';
    
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('slider-dot');
      
      if (i === this.currentIndex) {
        dot.classList.add('active');
      }
      
      dot.dataset.index = i;
      dot.addEventListener('click', () => {
        this.goToSlide(i);
      });
      
      this.dotsContainer.appendChild(dot);
    }
  }

  updateSlider() {
    this.slider.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    this.updateDots();
  }

  updateDots() {
    const dots = this.dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  nextSlide() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateSlider();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlider();
    this.restart();
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  restart() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  addEventListeners() {
    const sliderWrapper = this.slider.closest('.officials-slider-wrapper');
    
    if (sliderWrapper) {
      sliderWrapper.addEventListener('mouseenter', () => {
        this.stopAutoSlide();
      });
      
      sliderWrapper.addEventListener('mouseleave', () => {
        this.startAutoSlide();
      });
    }
  }
}

// === UTILITY FUNCTIONS ===
const Utils = {
  // Smooth scroll to element
  scrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  },

  // Add fade-in animation to elements
  addFadeInAnimation(elements) {
    if (typeof elements === 'string') {
      elements = document.querySelectorAll(elements);
    }
    
    elements.forEach(element => {
      element.classList.add('fade-in');
    });
  },

  // Add slide-up animation to elements
  addSlideUpAnimation(elements) {
    if (typeof elements === 'string') {
      elements = document.querySelectorAll(elements);
    }
    
    elements.forEach(element => {
      element.classList.add('slide-up');
    });
  },

  // Intersection Observer for scroll animations
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.official-card, .vision-mission-content, .umkm-card');
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
};

// === NAVBAR FUNCTIONALITY ===
class Navbar {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.init();
  }

  init() {
    this.addScrollEffect();
    this.addMobileMenuToggle();
  }

  addScrollEffect() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
    });
  }

  addMobileMenuToggle() {
    // Add mobile menu functionality if needed
    // This can be expanded for responsive mobile menu
  }
}

// === FORM VALIDATION (if needed for contact forms) ===
class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      if (!this.validateForm()) {
        e.preventDefault();
      }
    });
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        this.showError(input, 'Field ini wajib diisi');
        isValid = false;
      } else {
        this.clearError(input);
      }
    });

    return isValid;
  }

  showError(input, message) {
    input.classList.add('error');
    
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.classList.add('error-message');
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    
    errorElement.textContent = message;
  }

  clearError(input) {
    input.classList.remove('error');
    
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.remove();
    }
  }
}

// === LOADING ANIMATION ===
class LoadingManager {
  constructor() {
    this.init();
  }

  init() {
    // Show loading spinner
    this.showLoading();
    
    // Hide loading when page is fully loaded
    window.addEventListener('load', () => {
      this.hideLoading();
    });
  }

  showLoading() {
    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Memuat...</p>
      </div>
    `;
    
    // Add loader styles
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    `;
    
    document.body.appendChild(loader);
  }

  hideLoading() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
      }, 300);
    }
  }
}

// === PERFORMANCE OPTIMIZATION ===
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.optimizeScrollEvents();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  optimizeScrollEvents() {
    let ticking = false;

    const updateScrollPosition = () => {
      // Update scroll-dependent elements
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  const mainSlider = new MainSlider('mainSlider');
  const officialsSlider = new OfficialsSlider('pejabatSlider', 'pejabatDots');
  const navbar = new Navbar();
  const loadingManager = new LoadingManager();
  const performanceOptimizer = new PerformanceOptimizer();
  
  // Initialize scroll animations
  Utils.initScrollAnimations();
  
  // Initialize form validation if contact form exists
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    new FormValidator('contactForm');
  }
  
  // Add smooth scrolling to anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      Utils.scrollTo(targetId);
    });
  });
  
  // Add click tracking for analytics (if needed)
  document.querySelectorAll('.umkm-card, .social-icon').forEach(element => {
    element.addEventListener('click', function() {
      // Track clicks for analytics
      console.log('Clicked:', this.getAttribute('href') || this.textContent);
    });
  });
});

// === ERROR HANDLING ===
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
  // You can add error reporting here
});

// === EXPORT FOR MODULES (if using ES6 modules) ===
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MainSlider,
    OfficialsSlider,
    Navbar,
    FormValidator,
    LoadingManager,
    PerformanceOptimizer,
    Utils
  };
}