// Implementa o padrão Facade, atuando como o orquestrador central que gerencia o ciclo de vida e as interações do jogo.

export default class Game {
    constructor(gameArea, player, enemyFactory, gameState, audioManager) {
        this.gameArea = gameArea;
        this.player = player;
        this.enemyFactory = enemyFactory;
        this.gameState = gameState;
        this.audioManager = audioManager; 

        this.enemies = [];
        this.enemySpeed = 1.5;
        this.enemySpawnInterval = null;
    }

    start() {
        this.gameState.reset();
        this.player.reset();
        this.enemies.forEach(e => e.remove());
        this.enemies = [];

        this.enemySpawnInterval = setInterval(() => {
            if (!this.gameState.isGameOver) {
                this.enemies.push(this.enemyFactory.create());
            }
        }, 2500);

        this.gameLoop();
    }

    gameLoop() {
        if (this.gameState.isGameOver) {
            this.stop();
            return;
        }

        this.player.update();
        this.moveEnemies();
        this.detectCollisions();

        requestAnimationFrame(() => this.gameLoop());
    }
    
    stop() {
        clearInterval(this.enemySpawnInterval);
    }

    moveEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];
            let currentTop = parseFloat(enemy.style.top);
            currentTop += this.enemySpeed;
            enemy.style.top = `${currentTop}px`;

            const enemyRect = enemy.getBoundingClientRect();
            const rocketRect = this.player.rocket.getBoundingClientRect();
            if (enemyRect.left < rocketRect.right && enemyRect.right > rocketRect.left &&
                enemyRect.top < rocketRect.bottom && enemyRect.bottom > rocketRect.top) {
                enemy.remove();
                this.enemies.splice(i, 1);
                i--;
                this.gameState.loseLife();
                continue;
            }

            if (currentTop > this.gameArea.offsetHeight) {
                enemy.remove();
                this.enemies.splice(i, 1);
                i--;
                this.gameState.loseLife();
            }
        }
    }

    detectCollisions() {
        for (let i = 0; i < this.player.projectiles.length; i++) {
            const projectile = this.player.projectiles[i];
            const projectileRect = projectile.getBoundingClientRect();

            for (let j = 0; j < this.enemies.length; j++) {
                const enemy = this.enemies[j];
                const enemyRect = enemy.getBoundingClientRect();
                
                if (projectileRect.left < enemyRect.right &&
                    projectileRect.right > enemyRect.left &&
                    projectileRect.top < enemyRect.bottom &&
                    projectileRect.bottom > enemyRect.top) {
                    
                    this.audioManager.playExplosionSound();

                    projectile.remove();
                    this.player.projectiles.splice(i, 1);
                    i--;
                    
                    enemy.remove();
                    this.enemies.splice(j, 1);
                    j--;
                    
                    this.gameState.addScore(10);
                    break; 
                }
            }
        }
    }
}