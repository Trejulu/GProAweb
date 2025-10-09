// Navegación y menú móvil

class Navigation {
    constructor() {
        this.header = document.querySelector('.main-nav');
        this.mobileMenuBtn = document.getElementById('menuToggle');
        this.mobileNav = document.getElementById('mobileNav');
        this.closeMenuBtn = document.getElementById('closeMenu');
        
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupSmoothScroll();
        this.setupMobileMenu();
    }

    setupScrollEffect() {
        if (!this.header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.header.style.background = 'rgba(0, 26, 51, 0.98)';
            } else {
                this.header.style.background = 'rgba(0, 26, 51, 0.7)';
            }
        });
    }

    setupSmoothScroll() {
        // Smooth scroll para enlaces de navegación
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    this.closeMobileMenu();
                }
            });
        });
    }

    setupMobileMenu() {
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        if (this.closeMenuBtn) {
            this.closeMenuBtn.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (this.mobileNav && this.mobileNav.classList.contains('active')) {
                if (!this.mobileNav.contains(e.target) && !this.mobileMenuBtn.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });

        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileNav && this.mobileNav.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        if (this.mobileNav) {
            this.mobileNav.classList.toggle('active');
        }
    }

    closeMobileMenu() {
        if (this.mobileNav) {
            this.mobileNav.classList.remove('active');
        }
    }
}

// Inicializar navegación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});
