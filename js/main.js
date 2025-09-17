// GProA Technology - JavaScript principal

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar componentes
    initNavigation();
    initHeroAnimations();
    initProjectTabs();
    initScrollAnimations();
    initContactForm();
});

// Navegación
function initNavigation() {
    const header = document.querySelector('.main-header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.main-nav');

    // Scroll effect en header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Smooth scroll para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

// Animaciones del Hero
function initHeroAnimations() {
    const subtitles = document.querySelectorAll('.hero-subtitle');
    let currentIndex = 0;

    function showNextSubtitle() {
        subtitles.forEach(subtitle => subtitle.classList.remove('active'));
        subtitles[currentIndex].classList.add('active');
        currentIndex = (currentIndex + 1) % subtitles.length;
    }

    // Mostrar primer subtítulo
    if (subtitles.length > 0) {
        subtitles[0].classList.add('active');
        setInterval(showNextSubtitle, 3000);
    }

    // Animación de las tarjetas hero
    const heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-up');
    });
}

// Sistema de pestañas para proyectos
function initProjectTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.project-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetProject = btn.getAttribute('data-project');

            // Remover clase active de todos los botones y contenidos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Agregar clase active al botón clickeado y su contenido
            btn.classList.add('active');
            const targetContent = document.getElementById(`${targetProject}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animatedElements = document.querySelectorAll(
        '.service-card, .tech-card, .team-member, .hero-card'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Formulario de contacto
function initContactForm() {
    const form = document.querySelector('.contact-form');

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Obtener datos del formulario
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Validación básica
            if (!data.name || !data.email || !data.message) {
                showNotification('Por favor, completa todos los campos requeridos.', 'error');
                return;
            }

            if (!isValidEmail(data.email)) {
                showNotification('Por favor, ingresa un email válido.', 'error');
                return;
            }

            // Configurar botón de envío
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            try {
                // Enviar datos al servidor de correo
                const response = await fetch('https://formspree.io/f/mdklrzab', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                    form.reset();
                } else {
                    throw new Error('Error al enviar el mensaje');
                }
            } catch (error) {
                showNotification('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Utilidades
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Estilos
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
        maxWidth: '300px'
    });

    // Colores según tipo
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };

    notification.style.background = colors[type] || colors.info;

    // Agregar al DOM
    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Efectos de partículas simples para el hero
function createParticles() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        Object.assign(particle.style, {
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: '#00d4ff',
            borderRadius: '50%',
            opacity: Math.random() * 0.5 + 0.2,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite alternate`
        });

        hero.appendChild(particle);
    }
}

// CSS para animaciones adicionales
const additionalStyles = `
    .fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes float {
        from {
            transform: translateY(0px);
        }
        to {
            transform: translateY(-20px);
        }
    }
    
    .particle {
        pointer-events: none;
    }
    
    .main-nav.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(10, 10, 10, 0.98);
        flex-direction: column;
        padding: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;

// Agregar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Inicializar partículas cuando se carga la página
window.addEventListener('load', createParticles);
