// Formulario de contacto y WhatsApp

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.setupFormSubmission();
        }
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        // Obtener valores del formulario
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validación
        if (!this.validateForm(formData)) {
            return;
        }

        // Formatear mensaje para WhatsApp
        const whatsappMessage = this.formatWhatsAppMessage(formData);
        
        // Mostrar confirmación y enviar
        if (confirm('¿Deseas enviar este mensaje a través de WhatsApp?')) {
            this.sendToWhatsApp(whatsappMessage);
            this.form.reset();
        }
    }

    validateForm(data) {
        if (!data.name || !data.email || !data.subject || !data.message) {
            this.showNotification('Por favor, completa todos los campos.', 'error');
            return false;
        }

        if (!this.isValidEmail(data.email)) {
            this.showNotification('Por favor ingresa un email válido.', 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    formatWhatsAppMessage(data) {
        return `*Nuevo mensaje de contacto*%0A%0A` +
               `*Nombre:* ${encodeURIComponent(data.name)}%0A` +
               `*Email:* ${encodeURIComponent(data.email)}%0A` +
               `*Asunto:* ${encodeURIComponent(data.subject)}%0A` +
               `*Mensaje:* ${encodeURIComponent(data.message)}`;
    }

    sendToWhatsApp(message) {
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const whatsappUrl = isMobile
            ? `https://wa.me/5214681208570?text=${message}`
            : `https://web.whatsapp.com/send?phone=5214681208570&text=${message}`;

        window.open(whatsappUrl, '_blank');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            background: type === 'error' ? '#ef4444' : '#10b981'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Inicializar formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
