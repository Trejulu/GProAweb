// Mobile Navigation - Shared JavaScript
// GProA Technology - Navegación móvil compartida

document.addEventListener('DOMContentLoaded', function () {
    initMobileNavigation();
});

function initMobileNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.getElementById('mobileNav');
    const closeMenu = document.getElementById('closeMenu');

    // Open mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            openMobileMenu();
        });
    }

    // Close mobile menu
    if (closeMenu) {
        closeMenu.addEventListener('click', function () {
            closeMobileMenu();
        });
    }

    // Close on overlay click
    if (mobileNav) {
        mobileNav.addEventListener('click', function (e) {
            if (e.target === mobileNav) {
                closeMobileMenu();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking navigation links
    const navLinks = document.querySelectorAll('.mobile-nav-overlay .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMobileMenu();
        });
    });

    // Handle sidebar toggle for apps with sidebar
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function () {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('active');
            }
        });
    }
}

function openMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Utility functions for mobile interactions
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Touch-friendly interactions
function initTouchInteractions() {
    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .device, .room, .scenario, .metric-category-btn');

    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.98)';
        });

        element.addEventListener('touchend', function () {
            this.style.transform = '';
        });
    });
}

// Initialize touch interactions
document.addEventListener('DOMContentLoaded', initTouchInteractions);