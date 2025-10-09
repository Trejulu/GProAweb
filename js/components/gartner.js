// Métricas Gartner - Cuadrante Mágico y Gráficas

class GartnerMetrics {
    constructor() {
        this.charts = {};
        this.init();
    }

    init() {
        this.createGartnerQuadrant();
        this.createEvolutionChart();
        this.createSolutionsChart();
        this.createMarketChart();
    }

    createGartnerQuadrant() {
        const canvas = document.getElementById('gartnerQuadrant');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Limpiar canvas
        ctx.clearRect(0, 0, width, height);

        // Configurar gradiente de fondo
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, 'rgba(0, 102, 255, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 224, 255, 0.05)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Dibujar líneas de cuadrante
        ctx.strokeStyle = 'rgba(0, 224, 255, 0.3)';
        ctx.lineWidth = 2;
        
        // Línea vertical
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
        
        // Línea horizontal
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        // Etiquetas de cuadrantes
        ctx.font = '14px Orbitron';
        ctx.textAlign = 'center';
        
        // Líderes (superior derecha)
        ctx.fillStyle = '#ffd700';
        ctx.fillText('LÍDERES', width * 0.75, 30);
        
        // Visionarios (superior izquierda)
        ctx.fillStyle = '#00e0ff';
        ctx.fillText('VISIONARIOS', width * 0.25, 30);
        
        // Retadores (inferior derecha)
        ctx.fillStyle = '#ff6b35';
        ctx.fillText('RETADORES', width * 0.75, height - 15);
        
        // Jugadores de Nicho (inferior izquierda)
        ctx.fillStyle = '#8a2be2';
        ctx.fillText('JUGADORES DE NICHO', width * 0.25, height - 15);

        // Etiquetas de ejes
        ctx.font = '12px Exo 2';
        ctx.fillStyle = 'rgba(224, 242, 254, 0.8)';
        
        // Eje X - Capacidad de Ejecución
        ctx.save();
        ctx.translate(width / 2, height - 5);
        ctx.textAlign = 'center';
        ctx.fillText('Capacidad de Ejecución →', 0, 0);
        ctx.restore();
        
        // Eje Y - Integridad de Visión
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('← Integridad de Visión', 0, 0);
        ctx.restore();

        // Posicionar empresas
        const companies = [
            { name: 'GProA Technology', x: 0.72, y: 0.68, color: '#00e0ff', size: 8 },
            { name: 'Siemens', x: 0.85, y: 0.82, color: '#94a3b8', size: 6 },
            { name: 'ABB', x: 0.78, y: 0.75, color: '#94a3b8', size: 6 },
            { name: 'Schneider Electric', x: 0.80, y: 0.70, color: '#94a3b8', size: 6 },
            { name: 'Rockwell', x: 0.75, y: 0.65, color: '#94a3b8', size: 6 },
            { name: 'Honeywell', x: 0.73, y: 0.60, color: '#94a3b8', size: 6 },
            { name: 'Emerson', x: 0.70, y: 0.58, color: '#94a3b8', size: 6 }
        ];

        companies.forEach(company => {
            const x = company.x * width;
            const y = (1 - company.y) * height; // Invertir Y para que arriba sea mayor

            // Dibujar punto
            ctx.beginPath();
            ctx.arc(x, y, company.size, 0, 2 * Math.PI);
            ctx.fillStyle = company.color;
            ctx.fill();
            
            // Efecto de brillo para GProA
            if (company.name === 'GProA Technology') {
                ctx.shadowBlur = 15;
                ctx.shadowColor = company.color;
                ctx.beginPath();
                ctx.arc(x, y, company.size + 2, 0, 2 * Math.PI);
                ctx.strokeStyle = company.color;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            // Etiqueta (solo para GProA para evitar saturación)
            if (company.name === 'GProA Technology') {
                ctx.font = '11px Orbitron';
                ctx.fillStyle = company.color;
                ctx.textAlign = 'left';
                ctx.fillText(company.name, x + 12, y + 4);
            }
        });
    }

    createEvolutionChart() {
        const ctx = document.getElementById('evolutionChart');
        if (!ctx) return;

        this.charts.evolution = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2022', '2023', '2024', '2025'],
                datasets: [
                    {
                        label: 'Capacidades de IA',
                        data: [25, 45, 75, 95],
                        borderColor: '#00e0ff',
                        backgroundColor: 'rgba(0, 224, 255, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Automatización Industrial',
                        data: [30, 50, 70, 85],
                        borderColor: '#0066ff',
                        backgroundColor: 'rgba(0, 102, 255, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Integración de Sistemas',
                        data: [40, 55, 65, 80],
                        borderColor: '#8a2be2',
                        backgroundColor: 'rgba(138, 43, 226, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0f2fe',
                            font: { family: 'Exo 2' }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(148, 163, 184, 0.1)' }
                    },
                    y: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(148, 163, 184, 0.1)' },
                        min: 0,
                        max: 100
                    }
                }
            }
        });
    }

    createSolutionsChart() {
        const ctx = document.getElementById('solutionsChart');
        if (!ctx) return;

        this.charts.solutions = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Innovación', 'Especialización', 'Escalabilidad', 'Integración', 'Soporte', 'Costo-Beneficio'],
                datasets: [
                    {
                        label: 'GProA Technology',
                        data: [92, 88, 75, 85, 80, 90],
                        borderColor: '#00e0ff',
                        backgroundColor: 'rgba(0, 224, 255, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: '#00e0ff',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Promedio del Mercado',
                        data: [70, 65, 85, 75, 85, 70],
                        borderColor: '#94a3b8',
                        backgroundColor: 'rgba(148, 163, 184, 0.1)',
                        borderWidth: 2,
                        pointBackgroundColor: '#94a3b8',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0f2fe',
                            font: { family: 'Exo 2' }
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: '#94a3b8',
                            backdropColor: 'transparent'
                        },
                        grid: { color: 'rgba(148, 163, 184, 0.2)' },
                        angleLines: { color: 'rgba(148, 163, 184, 0.2)' },
                        pointLabels: {
                            color: '#e0f2fe',
                            font: { family: 'Exo 2', size: 11 }
                        }
                    }
                }
            }
        });
    }

    createMarketChart() {
        const ctx = document.getElementById('marketChart');
        if (!ctx) return;

        this.charts.market = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['2023', '2024', '2025', '2026', '2027'],
                datasets: [
                    {
                        label: 'Mercado IA Industrial (Billones USD)',
                        data: [28.5, 35.2, 43.8, 54.1, 66.7],
                        backgroundColor: [
                            'rgba(0, 224, 255, 0.6)',
                            'rgba(0, 224, 255, 0.7)',
                            'rgba(0, 224, 255, 0.8)',
                            'rgba(0, 224, 255, 0.9)',
                            'rgba(0, 224, 255, 1.0)'
                        ],
                        borderColor: '#00e0ff',
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false
                    },
                    {
                        label: 'Oportunidad GProA (Millones USD)',
                        data: [2.1, 3.8, 6.2, 9.8, 14.5],
                        backgroundColor: [
                            'rgba(138, 43, 226, 0.6)',
                            'rgba(138, 43, 226, 0.7)',
                            'rgba(138, 43, 226, 0.8)',
                            'rgba(138, 43, 226, 0.9)',
                            'rgba(138, 43, 226, 1.0)'
                        ],
                        borderColor: '#8a2be2',
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0f2fe',
                            font: { family: 'Exo 2' }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(148, 163, 184, 0.1)' }
                    },
                    y: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(148, 163, 184, 0.1)' },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Método para actualizar gráficas cuando sea necesario
    updateCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.update === 'function') {
                chart.update();
            }
        });
    }

    // Destruir gráficas para evitar memory leaks
    destroy() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.charts = {};
    }
}

// Inicializar métricas Gartner cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar a que Chart.js esté disponible
    if (typeof Chart !== 'undefined') {
        new GartnerMetrics();
    } else {
        // Reintentar después de un breve delay si Chart.js no está listo
        setTimeout(() => {
            if (typeof Chart !== 'undefined') {
                new GartnerMetrics();
            }
        }, 1000);
    }
});
