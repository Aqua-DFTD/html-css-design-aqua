const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let particlesArray;

// Fonction pour générer une couleur aléatoire dans une palette spécifique
function getRandomColor() {
    const colors = [
        'rgba(255, 255, 255,' + Math.random() + ')', // Blanc avec transparence
        'rgba(173, 216, 230,' + Math.random() + ')', // Bleu clair
        'rgba(138, 43, 226,' + Math.random() + ')', // Violet foncé
        'rgba(70, 130, 180,' + Math.random() + ')'  // Bleu acier
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = centerX;
        this.y = centerY;
        this.size = Math.random() * 0.5 + 0.2; // Particules plus petites
        this.speed = Math.random() * 2 + 0.5;
        this.angle = Math.random() * 2 * Math.PI;
        this.color = getRandomColor(); // Couleur aléatoire
    }

    update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.size += 0.01; // Croissance réduite

        // Repositionner les particules lorsqu'elles sortent des bords du canvas
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < 200; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    // Dessiner le fond avec un dégradé radial
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(canvas.width, canvas.height));
    gradient.addColorStop(0, '#000022'); // Bleu très foncé
    gradient.addColorStop(0.5, '#0f4c75'); // Marine léger
    gradient.addColorStop(1, '#1e3a5f'); // Violet foncé

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
