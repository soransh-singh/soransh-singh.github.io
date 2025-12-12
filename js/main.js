/**
 * Soransh Singh Portfolio
 * Main JavaScript - Two Theme Switching & Animations
 * Hippie ☮ | Greek Myth Ω
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
  initThemeEffects();
});

/**
 * Theme Toggle - Switch between two themes
 */
function initThemeToggle() {
  const themeButtons = document.querySelectorAll('.theme-btn');
  
  // Load saved theme or default to hippie
  const savedTheme = localStorage.getItem('portfolio-theme') || 'hippie';
  setTheme(savedTheme);
  
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const newTheme = btn.dataset.theme;
      setTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  });
}

/**
 * Set theme and update all dynamic content
 */
function setTheme(theme) {
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
  
  // Update all elements with theme-specific data attributes
  const dynamicElements = document.querySelectorAll('[data-hippie][data-myth]');
  
  dynamicElements.forEach(el => {
    let content;
    switch(theme) {
      case 'myth':
        content = el.dataset.myth;
        break;
      default:
        content = el.dataset.hippie;
    }
    
    // Only update text nodes, not elements with children that have attributes
    if (el.childNodes.length === 0 || (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3)) {
      el.textContent = content;
    }
  });
  
  // Update page title
  const titles = {
    hippie: 'Soransh Singh | Web Developer ☮',
    myth: 'Soransh Singh | Web Developer Ω'
  };
  document.title = titles[theme];
  
  // Theme-specific effects
  handleThemeEffects(theme);
  
  // Log theme change with appropriate styling
  const themeStyles = {
    hippie: {
      name: '☮ Hippie',
      color: '#f97316',
      quote: '"All you need is love" — The Beatles',
      quoteColor: '#ec4899'
    },
    myth: {
      name: 'Ω Greek Myth',
      color: '#d4af37',
      quote: '"There is a crack in everything, that\'s how the light gets in" — Leonard Cohen',
      quoteColor: '#6366f1'
    }
  };
  
  const style = themeStyles[theme];
  console.log(`%cTheme: ${style.name}`, `font-size: 16px; font-weight: bold; color: ${style.color};`);
  console.log(`%c${style.quote}`, `font-size: 12px; font-style: italic; color: ${style.quoteColor};`);
}

/**
 * Initialize theme effects
 */
function initThemeEffects() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'hippie';
  handleThemeEffects(currentTheme);
}

/**
 * Handle theme-specific visual effects
 */
function handleThemeEffects(theme) {
  // Clean up previous effects
  cleanupThemeEffects();
  
  if (theme === 'hippie') {
    createFlowerEffect();
  } else if (theme === 'myth') {
    createConstellationEffect();
  }
}

/**
 * Clean up theme effects
 */
function cleanupThemeEffects() {
  const existingEffects = document.querySelectorAll('.theme-effect');
  existingEffects.forEach(el => el.remove());
}

/**
 * Hippie - Create floating flower effect
 */
function createFlowerEffect() {
  const container = document.createElement('div');
  container.className = 'theme-effect flower-container';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;
  
  const flowers = ['✿', '❀', '✾', '❁', '✽'];
  const flowerCount = 15;
  
  for (let i = 0; i < flowerCount; i++) {
    const flower = document.createElement('div');
    const size = 12 + Math.random() * 16;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 15 + Math.random() * 10;
    const flowerChar = flowers[Math.floor(Math.random() * flowers.length)];
    
    flower.innerHTML = flowerChar;
    flower.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      font-size: ${size}px;
      color: rgba(236, 72, 153, 0.4);
      animation: floatFlower ${duration}s ease-in-out ${delay}s infinite;
    `;
    container.appendChild(flower);
  }
  
  const styleEl = document.createElement('style');
  styleEl.className = 'theme-effect';
  styleEl.textContent = `
    @keyframes floatFlower {
      0%, 100% { 
        transform: translateY(0) rotate(0deg);
        opacity: 0.3;
      }
      50% { 
        transform: translateY(-40px) rotate(180deg);
        opacity: 0.6;
      }
    }
  `;
  document.head.appendChild(styleEl);
  document.body.appendChild(container);
}

/**
 * Myth - Create subtle constellation effect
 */
function createConstellationEffect() {
  const container = document.createElement('div');
  container.className = 'theme-effect constellation-container';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;
  
  // Create small dots representing stars
  const starCount = 30;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    const size = 2 + Math.random() * 3;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 3;
    const duration = 2 + Math.random() * 2;
    
    star.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      background: rgba(212, 175, 55, 0.6);
      border-radius: 50%;
      animation: twinkleStar ${duration}s ease-in-out ${delay}s infinite;
    `;
    container.appendChild(star);
  }
  
  const styleEl = document.createElement('style');
  styleEl.className = 'theme-effect';
  styleEl.textContent = `
    @keyframes twinkleStar {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.5); }
    }
  `;
  document.head.appendChild(styleEl);
  document.body.appendChild(container);
}

/**
 * Navigation scroll behavior
 */
function initNavigation() {
  const nav = document.getElementById('nav');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');
  
  if (!toggle || !mobileMenu) return;
  
  const toggleMenu = () => {
    toggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };
  
  toggle.addEventListener('click', toggleMenu);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      toggleMenu();
    }
  });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (!animatedElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Console Easter eggs
console.log('%c✦ Welcome to my portfolio!', 'font-size: 20px; font-weight: bold; color: #f97316;');
console.log('%cClick the theme buttons to travel between worlds:', 'font-size: 14px; color: #a78b6b;');
console.log('%c☮ Hippie — Beatles, Dylan, Peace & Love', 'font-size: 12px; color: #ec4899;');
console.log('%cΩ Greek Myth — Leonard Cohen, Ancient Gods, Wisdom', 'font-size: 12px; color: #6366f1;');
console.log('%c🔗 github.com/soransh-singh', 'font-size: 12px; color: #14b8a6;');
