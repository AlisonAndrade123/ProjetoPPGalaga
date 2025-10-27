// Ponto de entrada que monta e inicia o jogo (Dependency Injection).

import GameState from './GameState.js';
import UIManager from './UIManager.js';
import Player from './Player.js';
import EnemyFactory from './EnemyFactory.js';
import Game from './Game.js';

window.addEventListener('load', () => {
    const gameArea = document.getElementById('gameArea');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const livesDisplay = document.getElementById('livesDisplay');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalScoreDisplay = document.getElementById('finalScore');
    const restartButton = document.getElementById('restartButton');
    const rocket = document.getElementById('rocket');
    const rocketContainer = document.getElementById('rocketContainer');
    
    const enemyImages = ['icone1.png', 'icone2.png', 'icone3.png', 'icone4.png'];

    // Criar as instâncias das classes (módulos)
    const gameState = new GameState(); // Singleton
    const uiManager = new UIManager(scoreDisplay, livesDisplay, gameOverScreen, finalScoreDisplay);
    const player = new Player(rocket, rocketContainer, gameArea);
    const enemyFactory = new EnemyFactory(gameArea, enemyImages);
    
    // Criar a instância do jogo principal (Facade), injetando as dependências
    const game = new Game(gameArea, player, enemyFactory, gameState);

    gameState.addObserver(uiManager);
    
    game.start();

    restartButton.addEventListener('click', () => {
        game.start();
    });
});