// Formulario de contacto con EmailJS

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = this.form?.querySelector('.submit-btn');
        this.btnText = this.submitBtn?.querySelector('.btn-text');
        this.btnLoading = this.submitBtn?.querySelector('.btn-loading');

        // Configuración EmailJS (reemplaza con tus credenciales)
        this.serviceID = 'service_gproa_contact';
        this.templateID = 'template_gproa_lead';
        this.publicKey = 'your_public_key_here';

        this.init();
    }

    init() {
        if (this.form) {
            this.setupEmailJS();
            this.setupFormSubmission();
            this.setupRealTimeValidation();
        }
    }

    setupEmailJS() {
        // Inicializar EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init(this.publicKey);
        } else {
            console.error('EmailJS no está cargado');
        }
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!value) {
                    isValid = false;
                    errorMessage = 'El nombre es requerido';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'El nombre debe tener al menos 2 caracteres';
                }
                break;
            case 'email':
                if (!value) {
                    isValid = false;
                    errorMessage = 'El email es requerido';
                } else if (!this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Ingresa un email válido';
                }
                break;
            case 'message':
                if (!value) {
                    isValid = false;
                    errorMessage = 'El mensaje es requerido';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        // Remover error anterior
        this.clearFieldError(field);

        // Agregar clase de error
        field.classList.add('field-error');

        // Crear mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;

        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('field-error');
        const errorMessage = field.parentNode.querySelector('.field-error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    handleSubmit() {
        const formData = this.getFormData();

        // Validación
        if (!this.validateForm(formData)) {
            return;
        }

        // Enviar formulario
        this.sendEmail(formData);
    }

    getFormData() {
        return {
            from_name: document.getElementById('name').value.trim(),
            from_email: document.getElementById('email').value.trim(),
            company: document.getElementById('company').value.trim(),
            industry: document.getElementById('industry').value,
            budget: document.getElementById('budget').value,
            timeline: document.getElementById('timeline').value,
            interest: document.getElementById('interest').value,
            message: document.getElementById('message').value.trim(),
            to_email: 'trejulu66@gmail.com', // Email de destino
            reply_to: document.getElementById('email').value.trim()
        };
    }

    validateForm(data) {
        let isValid = true;
        const fields = ['name', 'email', 'message'];

        // Validar campos individuales
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !this.validateField(field)) {
                isValid = false;
            }
        });

        // Validar select industry si existe
        const industrySelect = document.getElementById('industry');
        if (industrySelect && !industrySelect.value) {
            this.showFieldError(industrySelect, 'Selecciona un sector');
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async sendEmail(formData) {
        this.setLoadingState(true);

        try {
            // Enviar email usando EmailJS
            const result = await emailjs.send(
                this.serviceID,
                this.templateID,
                formData
            );

            if (result.status === 200) {
                this.showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                this.form.reset();

                // Opcional: Enviar también a WhatsApp como backup
                this.sendWhatsAppBackup(formData);
            } else {
                throw new Error('Error en el envío');
            }

        } catch (error) {
            console.error('Error al enviar email:', error);
            this.showNotification('Hubo un error al enviar el mensaje. Inténtalo de nuevo o contáctanos por WhatsApp.', 'error');

            // Fallback a WhatsApp si falla EmailJS
            this.sendWhatsAppBackup(formData);
        } finally {
            this.setLoadingState(false);
        }
    }

    sendWhatsAppBackup(formData) {
        // Crear mensaje de WhatsApp como backup
        const whatsappMessage = this.formatWhatsAppMessage(formData);

        setTimeout(() => {
            if (confirm('¿También quieres enviar una copia por WhatsApp?')) {
                this.openWhatsApp(whatsappMessage);
            }
        }, 2000);
    }

    formatWhatsAppMessage(data) {
        return `*Nueva consulta desde web GProA*%0A%0A` +
            `*Nombre:* ${encodeURIComponent(data.from_name)}%0A` +
            `*Email:* ${encodeURIComponent(data.from_email)}%0A` +
            `*Empresa:* ${encodeURIComponent(data.company || 'No especificada')}%0A` +
            `*Sector:* ${encodeURIComponent(data.industry)}%0A` +
            `*Presupuesto:* ${encodeURIComponent(data.budget || 'No especificado')}%0A` +
            `*Plazo:* ${encodeURIComponent(data.timeline || 'No especificado')}%0A` +
            `*Producto:* ${encodeURIComponent(data.interest || 'Consulta general')}%0A%0A` +
            `*Mensaje:* ${encodeURIComponent(data.message)}`;
    }

    openWhatsApp(message) {
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const whatsappUrl = isMobile
            ? `https://wa.me/5214681208570?text=${message}`
            : `https://web.whatsapp.com/send?phone=5214681208570&text=${message}`;

        window.open(whatsappUrl, '_blank');
    }

    setLoadingState(loading) {
        if (!this.submitBtn || !this.btnText || !this.btnLoading) return;

        if (loading) {
            this.submitBtn.disabled = true;
            this.btnText.style.display = 'none';
            this.btnLoading.style.display = 'inline';
        } else {
            this.submitBtn.disabled = false;
            this.btnText.style.display = 'inline';
            this.btnLoading.style.display = 'none';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };

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
            maxWidth: '350px',
            background: colors[type] || colors.info,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
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
        }, 6000);
    }
}

// Funciones para CTAs de proyectos
function openDemoModal(product) {
    // Crear modal de demo
    const modal = document.createElement('div');
    modal.className = 'demo-modal-overlay';
    modal.innerHTML = `
        <div class="demo-modal">
            <div class="demo-modal-header">
                <h3>Demo Interactiva - ${product.toUpperCase()}</h3>
                <button class="close-modal" onclick="closeDemoModal()">&times;</button>
            </div>
            <div class="demo-modal-body">
                <p>¿Te gustaría agendar una demostración personalizada de ${product.toUpperCase()}?</p>
                <div class="demo-options">
                    <button class="demo-option" onclick="scheduleDemo('${product}', 'online')">
                        <i class="fas fa-video"></i>
                        <span>Demo Online (15 min)</span>
                    </button>
                    <button class="demo-option" onclick="scheduleDemo('${product}', 'onsite')">
                        <i class="fas fa-building"></i>
                        <span>Demo Presencial</span>
                    </button>
                    <button class="demo-option" onclick="scheduleDemo('${product}', 'webinar')">
                        <i class="fas fa-users"></i>
                        <span>Webinar Grupal</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Animación de entrada
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeDemoModal() {
    const modal = document.querySelector('.demo-modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

function openQuoteForm(product) {
    // Pre-seleccionar el producto en el formulario de contacto
    const interestSelect = document.getElementById('interest');
    if (interestSelect) {
        const productOptions = {
            'gecrai': 'GECRAI - Consultoría Regulatoria con IA',
            'giacelia': 'GIACELIA - Automatización Industrial',
            'glucai': 'GlucAI - Monitoreo Diabetes',
            'saiydd': 'SAIyDD - Educación Inclusiva'
        };

        interestSelect.value = product;
        document.getElementById('message').value = `Estoy interesado en obtener una cotización para ${productOptions[product] || product}.`;
    }

    // Scroll al formulario de contacto
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });

    // Resaltar el formulario temporalmente
    const form = document.getElementById('contactForm');
    if (form) {
        form.style.boxShadow = '0 0 30px rgba(0, 224, 255, 0.5)';
        setTimeout(() => form.style.boxShadow = '', 3000);
    }
}

function scheduleDemo(product, type) {
    const demoTypes = {
        'online': 'Demo Online (15 minutos)',
        'onsite': 'Demo Presencial',
        'webinar': 'Webinar Grupal'
    };

    // Pre-llenar formulario con solicitud de demo
    const interestSelect = document.getElementById('interest');
    const messageTextarea = document.getElementById('message');

    if (interestSelect && messageTextarea) {
        const productNames = {
            'gecrai': 'GECRAI - Consultoría Regulatoria con IA',
            'giacelia': 'GIACELIA - Automatización Industrial',
            'glucai': 'GlucAI - Monitoreo Diabetes',
            'saiydd': 'SAIyDD - Educación Inclusiva'
        };

        interestSelect.value = product;
        messageTextarea.value = `Solicito agendar una ${demoTypes[type]} para ${productNames[product] || product}. Por favor, indiquen las fechas disponibles.`;
    }

    closeDemoModal();
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
}

// Inicializar formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
