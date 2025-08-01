class ContactForm {
    constructor() {
      this.form = document.querySelector('.contact-form');
      this.statusTimeout = null;
      this.init();
    }
    
    init() {
      if (!this.form) return;
      
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
      this.attachInputValidation();
    }
    
    attachInputValidation() {
      const inputs = this.form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => {
          this.removeError(input);
          this.validateField(input);
        });
      });
    }
    
    validateField(field) {
      const value = field.value.trim();
      
      if (!value) {
        this.showError(field, 'Este campo é obrigatório');
        return false;
      }
      
      if (field.type === 'email' && !this.isValidEmail(value)) {
        this.showError(field, 'Por favor, insira um e-mail válido');
        return false;
      }
      
      if (field.tagName === 'TEXTAREA' && value.length < 10) {
        this.showError(field, 'A mensagem deve ter pelo menos 10 caracteres');
        return false;
      }
      
      this.showSuccess(field);
      return true;
    }
    
    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    showError(field, message) {
      const formGroup = field.closest('.form-group');
      formGroup.classList.remove('success');
      formGroup.classList.add('error');
      const errorElement = formGroup.querySelector('.form-error');
      if (errorElement) {
        errorElement.textContent = message;
      }
    }
    
    showSuccess(field) {
      const formGroup = field.closest('.form-group');
      formGroup.classList.remove('error');
      formGroup.classList.add('success');
    }
    
    removeError(field) {
      const formGroup = field.closest('.form-group');
      formGroup.classList.remove('error', 'success');
    }
    
    setSubmitButtonState(loading) {
      const submitButton = this.form.querySelector('.submit-button');
      submitButton.disabled = loading;
      submitButton.textContent = loading ? 'Enviando...' : 'Enviar';
    }
    
    async handleSubmit(e) {
      e.preventDefault();
      
      const inputs = this.form.querySelectorAll('input, textarea, select');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });
      
      if (!isValid) return;
      
      this.setSubmitButtonState(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        this.form.reset();
        inputs.forEach(input => this.removeError(input));
        alert('Mensagem enviada com sucesso!');
      } catch (error) {
        alert('Erro ao enviar mensagem. Por favor, tente novamente.');
      } finally {
        this.setSubmitButtonState(false);
      }
    }
  }
  
  // Initialize form when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
  });