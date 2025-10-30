// js/AudioManager.js - ATUALIZADO com som de tiro

// Padrão: Observer (atuando como um observador do GameState)
// Padrão: Dependency Injection (agora recebe quatro elementos de áudio)

export default class AudioManager {
    constructor(backgroundMusicElement, gameOverSoundElement, explosionSoundElement, laserSoundElement) {
        this.backgroundMusic = backgroundMusicElement;
        this.gameOverSound = gameOverSoundElement;
        this.explosionSound = explosionSoundElement;
        this.laserSound = laserSoundElement; // 1. ARMAZENA O NOVO SOM DE TIRO
        
        this.isUserInteracted = false;
        this.wasGameOver = false;
    }

    // O método update continua o mesmo, pois gerencia o estado GERAL do jogo.
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

    // --- 2. NOVO MÉTODO PARA TOCAR O SOM DE TIRO ---
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