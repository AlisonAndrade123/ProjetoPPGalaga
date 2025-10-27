// js/AudioManager.js - CORRIGIDO PARA O BUG DE ÁUDIO

// Padrão: Observer (atuando como um observador do GameState)
// Padrão: Dependency Injection (agora recebe dois elementos de áudio)

export default class AudioManager {
    constructor(backgroundMusicElement, gameOverSoundElement) {
        this.backgroundMusic = backgroundMusicElement;
        this.gameOverSound = gameOverSoundElement;
        
        this.isUserInteracted = false;
        this.wasGameOver = false; // Flag para tocar o som de game over apenas uma vez
    }

    // O método update é chamado pelo GameState sempre que o estado muda
    update(gameState) {
        if (!this.isUserInteracted) return;

        // Verifica se o jogo ACABOU DE TERMINAR
        if (gameState.isGameOver && !this.wasGameOver) {
            this.backgroundMusic.pause();
            this.gameOverSound.currentTime = 0;
            this.gameOverSound.play();
        } 
        // Verifica se o jogo ACABOU DE REINICIAR
        else if (!gameState.isGameOver && this.wasGameOver) {
            // --- CORREÇÃO DO BUG AQUI ---
            // PAUSA o som de game over, caso ainda esteja tocando
            this.gameOverSound.pause();
            this.gameOverSound.currentTime = 0; // "Rebobina" o som para o início
            
            // Toca a música de fundo novamente
            this.playMusic();
        }
        
        // Atualiza o estado anterior para o próximo frame
        this.wasGameOver = gameState.isGameOver;
    }

    playMusic() {
        // ... (o resto do arquivo não muda)
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