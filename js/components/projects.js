// Sistema de pestañas para proyectos

class ProjectTabs {
    constructor() {
        this.tabBtns = document.querySelectorAll('.project-tab');
        this.tabContents = document.querySelectorAll('.project-content');
        
        this.init();
    }

    init() {
        this.setupTabSystem();
    }

    setupTabSystem() {
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetProject = btn.getAttribute('data-tab');
                this.switchTab(targetProject, btn);
            });
        });
    }

    switchTab(targetProject, activeBtn) {
        // Remover clase active de todos los botones y contenidos
        this.tabBtns.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));
        
        // Agregar clase active al botón clickeado
        activeBtn.classList.add('active');
        
        // Mostrar el contenido correspondiente
        const targetContent = document.getElementById(targetProject);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
}

// Inicializar sistema de pestañas
document.addEventListener('DOMContentLoaded', () => {
    new ProjectTabs();
});
