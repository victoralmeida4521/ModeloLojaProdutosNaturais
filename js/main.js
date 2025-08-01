// Performance optimized product loading with better error handling

// Enhanced image error handling with SVG fallback
function handleImageError(img) {
    const fallbackSvg = `
      <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="600" fill="var(--color-pastel)"/>
        <path d="M200 200H400V400H200V200Z" fill="var(--color-gold)"/>
        <path d="M280 280H320V320H280V280Z" fill="var(--color-white)"/>
      </svg>
    `;
    
    const fallbackUrl = `data:image/svg+xml,${encodeURIComponent(fallbackSvg)}`;
    img.src = fallbackUrl;
    img.classList.add('fallback-image');
  }
  
  // Optimized navbar handler with debouncing
  const handleNavbar = (() => {
    let timeout;
    return () => {
      if (timeout) window.cancelAnimationFrame(timeout);
      
      timeout = window.requestAnimationFrame(() => {
        const header = document.querySelector('.header');
        const scrollPosition = window.scrollY;
        
        header.classList.toggle('floating', scrollPosition > 50);
      });
    };
  })();
  
  // Enhanced lazy loading with IntersectionObserver and progressive loading
  function lazyLoadImages() {
    if (!('IntersectionObserver' in window)) return;
  
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        const img = entry.target;
        const src = img.dataset.src;
        
        if (!src) return;
        
        // Progressive image loading
        const tempImage = new Image();
        
        tempImage.onload = () => {
          img.src = src;
          img.classList.add('loaded');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        };
        
        tempImage.onerror = () => handleImageError(img);
        tempImage.src = src;
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });
  
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.classList.add('loading');
      imageObserver.observe(img);
    });
  }
  
  // Initialize with optimized event listeners
  document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    
    // Optimized scroll handler
    window.addEventListener('scroll', handleNavbar, { passive: true });
    
    // Enhanced smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  });
  
  // Optimized resize observer
  const resizeObserver = new ResizeObserver(entries => {
    requestAnimationFrame(() => {
      if (typeof equalizeCardHeights === 'function') {
        equalizeCardHeights();
      }
    });
  });
  
  window.addEventListener('load', () => {
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
      resizeObserver.observe(productsGrid);
    }
  });