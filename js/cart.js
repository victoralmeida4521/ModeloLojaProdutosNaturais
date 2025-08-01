class ShoppingCart {
    constructor() {
      this.items = [];
      this.init();
    }
  
    init() {
      this.renderCartIcon();
      this.loadFromLocalStorage();
      this.attachEventListeners();
    }
  
    renderCartIcon() {
      const header = document.querySelector('.header .nav ul');
      if (!header) return;
  
      const cartLi = document.createElement('li');
      cartLi.className = 'cart-icon';
      cartLi.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
        <span class="cart-count">0</span>
        <div class="cart-dropdown">
          <div class="cart-items"></div>
          <div class="cart-total">
            <span>Total:</span>
            <span class="total-amount">R$ 0,00</span>
          </div>
          <button class="reset-cart-button">Resetar Carrinho</button>
          <button class="checkout-button">Finalizar Compra</button>
        </div>
      `;
  
      header.appendChild(cartLi);
    }
  
    addItem(product) {
      if (!product || !product.id) {
        console.error('Invalid product:', product);
        return;
      }
  
      const existingItem = this.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
  
      this.updateCart();
      this.saveToLocalStorage();
    }
  
    removeItem(productId) {
      const itemIndex = this.items.findIndex(item => item.id === productId);
      
      if (itemIndex !== -1) {
        this.items.splice(itemIndex, 1);
        this.updateCart();
        this.saveToLocalStorage();
      }
    }
  
    updateQuantity(productId, newQuantity) {
      if (newQuantity <= 0) {
        this.removeItem(productId);
        return;
      }
  
      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity = newQuantity;
        this.updateCart();
        this.saveToLocalStorage();
      }
    }
  
    resetCart() {
      this.items = [];
      this.updateCart();
      this.saveToLocalStorage();
    }
  
    buyNow(product) {
      if (!product || !product.id) return;
      
      this.addItem(product);
      alert('Redirecionando para página de checkout...');
    }
  
    updateCart() {
      const cartCount = document.querySelector('.cart-count');
      const cartItems = document.querySelector('.cart-items');
      const totalAmount = document.querySelector('.total-amount');
  
      if (!cartCount || !cartItems || !totalAmount) return;
  
      const totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalQuantity;
  
      if (totalQuantity === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Carrinho vazio</div>';
        totalAmount.textContent = 'R$ 0,00';
        return;
      }
  
      cartItems.innerHTML = this.items.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}" onerror="handleImageError(this)">
          </div>
          <div class="cart-item-details">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</span>
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-btn minus" aria-label="Diminuir quantidade">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn plus" aria-label="Aumentar quantidade">+</button>
          </div>
        </div>
      `).join('');
  
      const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      totalAmount.textContent = `R$ ${total.toFixed(2)}`;
  
      this.attachQuantityButtonListeners();
    }
  
    attachQuantityButtonListeners() {
      const cartItems = document.querySelector('.cart-items');
      if (!cartItems) return;
  
      cartItems.querySelectorAll('.cart-item').forEach(item => {
        const productId = item.dataset.id;
        
        item.querySelector('.minus').addEventListener('click', (e) => {
          e.stopPropagation();
          const currentItem = this.items.find(i => i.id === productId);
          if (currentItem) {
            this.updateQuantity(productId, currentItem.quantity - 1);
          }
        });
        
        item.querySelector('.plus').addEventListener('click', (e) => {
          e.stopPropagation();
          const currentItem = this.items.find(i => i.id === productId);
          if (currentItem) {
            this.updateQuantity(productId, currentItem.quantity + 1);
          }
        });
      });
    }
  
    attachEventListeners() {
      document.addEventListener('click', e => {
        const resetButton = e.target.closest('.reset-cart-button');
        const buyButton = e.target.closest('.buy-button');
        const buyNowButton = e.target.closest('.buy-now');
        
        if (resetButton) {
          e.preventDefault();
          if (confirm('Tem certeza que deseja limpar o carrinho?')) {
            this.resetCart();
          }
        } else if (buyButton || buyNowButton) {
          const productCard = (buyButton || buyNowButton).closest('.product-card');
          if (productCard) {
            const productId = productCard.dataset.id;
            const product = window.PRODUCTS?.find(p => p.id === productId);
            
            if (product) {
              if (buyButton) {
                this.addItem(product);
              } else {
                this.buyNow(product);
              }
            }
          }
        }
      });
  
      // Close cart dropdown when clicking outside
      document.addEventListener('click', e => {
        const cartIcon = document.querySelector('.cart-icon');
        const isClickInside = cartIcon?.contains(e.target);
        
        if (!isClickInside && cartIcon) {
          cartIcon.querySelector('.cart-dropdown').style.display = 'none';
        }
      });
  
      // Toggle cart dropdown
      const cartIcon = document.querySelector('.cart-icon');
      if (cartIcon) {
        cartIcon.addEventListener('click', e => {
          if (e.target.closest('.cart-dropdown')) return;
          const dropdown = cartIcon.querySelector('.cart-dropdown');
          dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });
      }
    }
  
    saveToLocalStorage() {
      try {
        localStorage.setItem('cart', JSON.stringify(this.items));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  
    loadFromLocalStorage() {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          this.items = JSON.parse(savedCart);
          this.updateCart();
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        this.items = [];
      }
    }
  }
  
  // Initialize cart when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
  });