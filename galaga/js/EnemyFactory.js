// Padrão: Factory
// Padrão: Dependency Injection (recebe a gameArea e as imagens)

export default class EnemyFactory {
    constructor(gameArea, enemyImages) {
        this.gameArea = gameArea;
        this.enemyImages = enemyImages;
        this.enemyWidth = 50;
    }

    create() {
        const enemy = document.createElement('img');
        const randomImageSrc = this.enemyImages[Math.floor(Math.random() * this.enemyImages.length)];
        
        enemy.src = `assets/${randomImageSrc}`;
        enemy.classList.add('enemy');
        
        const gameAreaWidth = this.gameArea.offsetWidth;
        const randomLeft = Math.random() * (gameAreaWidth - this.enemyWidth);
        
        enemy.style.left = `${randomLeft}px`;
        enemy.style.top = `-${this.enemyWidth}px`;

        this.gameArea.appendChild(enemy);
        return enemy;
    }
}