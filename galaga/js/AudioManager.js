// Atua como um Observer do GameState e gerencia a reprodução de todos os sons do jogo.

export default class AudioManager {
    constructor(backgroundMusicElement, gameOverSoundElement, explosionSoundElement, laserSoundElement) {
        this.backgroundMusic = backgroundMusicElement;
        this.gameOverSound = gameOverSoundElement;
        this.explosionSound = explosionSoundElement;
        this.laserSound = laserSoundElement; 
        
        this.isUserInteracted = false;
        this.wasGameOver = false;
    }

    update(gameState) {
        if (!this.isUserInteracted) return;

        if (gameState.isGameOver && !this.wasGameOver) {
            this.backgroundMusic.pause();
            this.gameOverSound.currentTime = 0;
            this.gameOverSound.play();
        } 
        else if (!gameState.isGameOver && this.wasGameOver) {
            this.gameOverSound.pause();
            this.gameOverSound.currentTime = 0;
            this.playMusic();
        }
        
        this.wasGameOver = gameState.isGameOver;
    }

    playExplosionSound() {
        this.explosionSound.currentTime = 0;
        this.explosionSound.play();
    }

    playLaserSound() {
        this.laserSound.currentTime = 0;
        this.laserSound.play();
    }

    playMusic() {
        const promise = this.backgroundMusic.play();
        if (promise !== undefined) {
            promise.catch(error => {
                console.log("Autoplay bloqueado. A música começará na primeira interação.");
            });
        }
    }

    userHasInteracted() {
        if (!this.isUserInteracted) {
            this.isUserInteracted = true;
            this.playMusic();
        }
    }
}