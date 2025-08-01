class ProductFilter {
    constructor() {
      this.minWeight = 0;
      this.maxWeight = 1000;
      this.selectedCategories = new Set();
      this.init();
    }
  
    init() {
      // Wait for products data to be available
      if (window.PRODUCTS) {
        this.products = window.PRODUCTS;
        this.filterProducts();
      } else {
        document.addEventListener('productsLoaded', () => {
          this.products = window.PRODUCTS;
          this.filterProducts();
        });
      }
      
      this.initRangeSlider();
      this.initCategoryFilters();
    }
  
    initializeProducts() {
      // Ensure products are available
      if (typeof window.PRODUCTS === 'undefined') {
        console.error('Products data not available');
        this.products = [];
        return;
      }
      
      this.products = window.PRODUCTS;
      this.filterProducts(); // Initial render
    }
  
    initRangeSlider() {
      const rangeInput = document.querySelectorAll('.range-input input');
      const rangeSelected = document.querySelector('.range-selected');
      const weightValues = document.querySelector('.weight-values');
      
      if (!rangeInput.length || !rangeSelected || !weightValues) return;
  
      const updateRangeValues = () => {
        let minVal = parseInt(rangeInput[0].value);
        let maxVal = parseInt(rangeInput[1].value);
        
        if (maxVal - minVal < 100) {
          if (this.activeSlider === 'min') {
            minVal = maxVal - 100;
            rangeInput[0].value = minVal;
          } else {
            maxVal = minVal + 100;
            rangeInput[1].value = maxVal;
          }
        }
        
        this.minWeight = minVal;
        this.maxWeight = maxVal;
        
        rangeSelected.style.left = (minVal / rangeInput[0].max) * 100 + '%';
        rangeSelected.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + '%';
        
        weightValues.textContent = `${minVal}g - ${maxVal}g`;
        
        this.debouncedFilterProducts();
      };
      
      rangeInput.forEach(input => {
        input.addEventListener('input', (e) => {
          this.activeSlider = e.target.classList.contains('min') ? 'min' : 'max';
          updateRangeValues();
        });
      });
    }
  
    initCategoryFilters() {
      const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
      
      categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
          const category = e.target.value;
          
          if (e.target.checked) {
            this.selectedCategories.add(category);
          } else {
            this.selectedCategories.delete(category);
          }
          
          this.debouncedFilterProducts();
        });
      });
    }
  
    debouncedFilterProducts() {
      if (this.filterTimeout) {
        clearTimeout(this.filterTimeout);
      }
      
      this.filterTimeout = setTimeout(() => {
        this.filterProducts();
      }, 300);
    }
  
    filterProducts() {
      if (!Array.isArray(this.products)) {
        console.error('Products array is not properly initialized');
        return;
      }
  
      const filteredProducts = this.products.filter(product => {
        const weightMatch = product.weight >= this.minWeight && product.weight <= this.maxWeight;
        const categoryMatch = this.selectedCategories.size === 0 || 
                            this.selectedCategories.has(product.category);
        
        return weightMatch && categoryMatch;
      });
  
      this.renderProducts(filteredProducts);
    }
  
    renderProducts(products) {
      const productsGrid = document.querySelector('.products-grid');
      if (!productsGrid) return;
      
      productsGrid.innerHTML = products.map(product => {
        const pricePerWeight = (product.price / (product.weight / 100)).toFixed(2);
        
        return `
          <article class="product-card" data-id="${product.id}">
            <div class="product-image">
              <div class="image-placeholder">
                <svg viewBox="0 0 24 24" width="48" height="48">
                  <rect width="24" height="24" fill="var(--color-pastel)"/>
                  <path fill="currentColor" d="M8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
              <img 
                data-src="${product.image}" 
                alt="${product.name}"
                loading="lazy"
                onload="this.parentElement.classList.add('loaded')"
                onerror="handleImageError(this)"
              >
            </div>
            <div class="product-details">
              <h3 title="${product.name}">${product.name}</h3>
              <p title="${product.description}">${product.description}</p>
              <div class="price-info">
                <span class="price">R$ ${product.price.toFixed(2)}</span>
                <span class="weight">${product.weight}g</span>
                <span class="price-per-weight">(R$ ${pricePerWeight}/100g)</span>
              </div>
              <div class="product-actions">
                <button class="buy-button">Adicionar ao Carrinho</button>
                <button class="buy-now">Comprar Agora</button>
              </div>
            </div>
          </article>
        `;
      }).join('');
      
      // Initialize lazy loading for new images
      if (typeof lazyLoadImages === 'function') {
        lazyLoadImages();
      }
      
      // Equalize card heights
      if (typeof equalizeCardHeights === 'function') {
        equalizeCardHeights();
      }
    }
  }
  
  // Initialize filter when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    window.productFilter = new ProductFilter();
  });