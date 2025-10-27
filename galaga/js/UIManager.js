// (Observer) Atualiza a tela (placar, vidas, game over).
// Padrão: Observer (atuando como um observador)
// Padrão: Dependency Injection (recebe os elementos do DOM)

export default class UIManager {
    constructor(scoreDisplay, livesDisplay, gameOverScreen, finalScoreDisplay) {
        this.scoreDisplay = scoreDisplay;
        this.livesDisplay = livesDisplay;
        this.gameOverScreen = gameOverScreen;
        this.finalScoreDisplay = finalScoreDisplay;
    }

    update(gameState) {
        this.scoreDisplay.textContent = `Pontos: ${gameState.score}`;
        this.livesDisplay.textContent = `Vidas: ${gameState.lives}`;

        if (gameState.isGameOver) {
            this.finalScoreDisplay.textContent = `Sua Pontuação Final: ${gameState.score}`;
            this.gameOverScreen.classList.remove('hidden');
        } else {
            this.gameOverScreen.classList.add('hidden');
        }
    }
}