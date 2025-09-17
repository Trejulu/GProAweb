// Sistema de partículas y efectos visuales

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        
        this.init();
    }

    init() {
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `rgba(0, 224, 255, ${Math.random() * 0.5 + 0.2})`
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Actualizar posición
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebotar en los bordes
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Dibujar partícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            
            // Efecto de brillo
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Símbolos flotantes
class FloatingSymbols {
    constructor() {
        this.container = document.getElementById('symbolsContainer');
        this.symbols = ['<', '>', '{', '}', '(', ')', '[', ']', '/', '*', '+', '-', '=', ';', ':', '?', '!', '@', '#', '$', '%', '^', '&'];
        this.activeSymbols = [];
        
        this.init();
    }

    init() {
        if (!this.container) return;
        
        this.createSymbols();
        setInterval(() => this.addSymbol(), 2000);
    }

    createSymbols() {
        // Crear algunos símbolos iniciales
        for (let i = 0; i < 5; i++) {
            setTimeout(() => this.addSymbol(), i * 1000);
        }
    }

    addSymbol() {
        if (this.activeSymbols.length >= 15) return;
        
        const symbol = document.createElement('div');
        symbol.className = 'code-symbol';
        symbol.textContent = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        symbol.style.left = Math.random() * 100 + '%';
        symbol.style.fontSize = (Math.random() * 20 + 15) + 'px';
        symbol.style.animationDelay = '0s';
        symbol.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        this.container.appendChild(symbol);
        this.activeSymbols.push(symbol);
        
        // Remover símbolo después de la animación
        setTimeout(() => {
            if (symbol.parentNode) {
                symbol.parentNode.removeChild(symbol);
                this.activeSymbols = this.activeSymbols.filter(s => s !== symbol);
            }
        }, 15000);
    }
}

// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.querySelector('.matrix-rain');
        this.ctx = null;
        this.drops = [];
        
        this.init();
    }

    init() {
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.createDrops();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createDrops() {
        const columns = Math.floor(this.canvas.width / 20);
        
        for (let i = 0; i < columns; i++) {
            this.drops.push({
                x: i * 20,
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 3 + 1,
                chars: '01'.split(''),
                currentChar: 0
            });
        }
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 26, 51, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'rgba(0, 224, 255, 0.8)';
        this.ctx.font = '15px monospace';
        
        this.drops.forEach(drop => {
            const char = drop.chars[Math.floor(Math.random() * drop.chars.length)];
            this.ctx.fillText(char, drop.x, drop.y);
            
            drop.y += drop.speed;
            
            if (drop.y > this.canvas.height && Math.random() > 0.975) {
                drop.y = 0;
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Inicializar efectos
document.addEventListener('DOMContentLoaded', () => {
    // Solo inicializar en dispositivos no móviles para mejor rendimiento
    if (window.innerWidth > 768) {
        new ParticleSystem();
        new FloatingSymbols();
        new MatrixRain();
    }
});
