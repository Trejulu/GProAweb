// Sistema de modales y acordeones

class ModalSystem {
    constructor() {
        this.modals = document.querySelectorAll('.modal-tech');
        this.init();
    }

    init() {
        this.setupModalTriggers();
        this.setupModalClosing();
        this.setupAccordions();
    }

    setupModalTriggers() {
        // Enlaces que abren modales
        document.querySelectorAll('[data-bs-toggle="modal"]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const targetModal = trigger.getAttribute('data-bs-target');
                this.openModal(targetModal);
            });
        });
    }

    setupModalClosing() {
        this.modals.forEach(modal => {
            // Botón de cerrar
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeModal(modal);
                });
            }

            // Botón de aceptar
            const acceptBtn = modal.querySelector('.btn-accept');
            if (acceptBtn) {
                acceptBtn.addEventListener('click', () => {
                    this.closeModal(modal);
                });
            }

            // Cerrar al hacer clic fuera del modal
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal-tech[style*="flex"]');
                if (openModal) {
                    this.closeModal(openModal);
                }
            }
        });
    }

    setupAccordions() {
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const isOpen = content.classList.contains('active');
                
                // Cerrar todos los acordeones del mismo modal
                const modal = header.closest('.modal-tech');
                if (modal) {
                    modal.querySelectorAll('.accordion-content').forEach(c => {
                        c.classList.remove('active');
                    });
                    modal.querySelectorAll('.accordion-header i:last-child').forEach(icon => {
                        icon.style.transform = 'rotate(0deg)';
                    });
                }
                
                // Abrir/cerrar el acordeón clickeado
                if (!isOpen) {
                    content.classList.add('active');
                    const icon = header.querySelector('i:last-child');
                    if (icon) {
                        icon.style.transform = 'rotate(180deg)';
                    }
                }
            });
        });
    }

    openModal(modalId) {
        const modal = document.querySelector(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Animación de entrada
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        }
    }

    closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

// Inicializar sistema de modales
document.addEventListener('DOMContentLoaded', () => {
    new ModalSystem();
});
