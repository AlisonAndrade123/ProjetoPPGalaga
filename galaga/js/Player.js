// Padrão: Dependency Injection (recebe os elementos do DOM e a área do jogo)
import GameState from './GameState.js'; 

export default class Player {
    constructor(rocketElement, rocketContainer, gameArea) {
        this.rocket = rocketElement;
        this.rocketContainer = rocketContainer;
        this.gameArea = gameArea;
        
        this.moveSpeed = 8; 
        this.projectileSpeed = 15;
        this.shootCooldown = 300;
        this.PROJECTILE_WIDTH = 8;
        
        this.rocketPixelPosition = 0; 
        this.canShoot = true;
        this.projectiles = [];
        this.keysPressed = {};

        this.setupEventListeners();
        this.centerRocket();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (event) => {
            this.keysPressed[event.key] = true;
            if (event.key === ' ' && this.canShoot && !new GameState().isGameOver) {
                this.createProjectile();
            }
        });
        document.addEventListener('keyup', (event) => {
            this.keysPressed[event.key] = false;
        });
    }

    centerRocket() {
        const containerWidth = this.rocketContainer.offsetWidth;
        const rocketWidth = this.rocket.offsetWidth;
        this.rocketPixelPosition = (containerWidth - rocketWidth) / 2;
        this.rocket.style.left = `${this.rocketPixelPosition}px`;
    }

    update() {
        if (new GameState().isGameOver) {
            this.keysPressed = {}; 
            return;
        }

        if (this.keysPressed['ArrowLeft']) this.move('left');
        if (this.keysPressed['ArrowRight']) this.move('right');
        
        this.moveProjectiles();
    }

    move(direction) {
        if (direction === 'left') {
            this.rocketPixelPosition -= this.moveSpeed;
        } else if (direction === 'right') {
            this.rocketPixelPosition += this.moveSpeed;
        }

        const minPosition = 0;
        const maxPosition = this.rocketContainer.offsetWidth - this.rocket.offsetWidth;
        if (this.rocketPixelPosition < minPosition) this.rocketPixelPosition = minPosition;
        if (this.rocketPixelPosition > maxPosition) this.rocketPixelPosition = maxPosition;

        this.rocket.style.left = `${this.rocketPixelPosition}px`;
    }

    createProjectile() {
        this.canShoot = false;
        const projectile = document.createElement('div');
        projectile.classList.add('projectile');

        const rocketCenterPx = this.rocketPixelPosition + (this.rocket.offsetWidth / 2);
        projectile.style.left = `${rocketCenterPx - (this.PROJECTILE_WIDTH / 2)}px`;
        projectile.style.bottom = '100px';

        this.gameArea.appendChild(projectile);
        this.projectiles.push(projectile);

        setTimeout(() => { this.canShoot = true; }, this.shootCooldown);
    }

    moveProjectiles() {
        for (let i = 0; i < this.projectiles.length; i++) {
            const projectile = this.projectiles[i];
            let currentBottom = parseFloat(projectile.style.bottom);
            currentBottom += this.projectileSpeed;
            projectile.style.bottom = `${currentBottom}px`;

            if (currentBottom > this.gameArea.offsetHeight) {
                projectile.remove();
                this.projectiles.splice(i, 1);
                i--;
            }
        }
    }

    reset() {
        this.projectiles.forEach(p => p.remove());
        this.projectiles = [];
        this.centerRocket();
    }
}