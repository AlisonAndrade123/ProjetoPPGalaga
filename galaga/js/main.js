// Ponto de entrada da aplicação (Composition Root). Responsável por criar e injetar todas as dependências.

import GameState from './GameState.js';
import UIManager from './UIManager.js';
import Player from './Player.js';
import EnemyFactory from './EnemyFactory.js';
import Game from './Game.js';
import AudioManager from './AudioManager.js';

window.addEventListener('load', () => {
    const gameArea = document.getElementById('gameArea');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const livesDisplay = document.getElementById('livesDisplay');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalScoreDisplay = document.getElementById('finalScore');
    const restartButton = document.getElementById('restartButton');
    const rocket = document.getElementById('rocket');
    const rocketContainer = document.getElementById('rocketContainer');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const gameOverSound = document.getElementById('gameOverSound');
    const explosionSound = document.getElementById('explosionSound');
    const laserSound = document.getElementById('laserSound'); 
    
    const enemyImages = ['icone1.png', 'icone2.png', 'icone3.png', 'icone4.png'];

    const gameState = new GameState();
    const uiManager = new UIManager(scoreDisplay, livesDisplay, gameOverScreen, finalScoreDisplay);
    
    const audioManager = new AudioManager(backgroundMusic, gameOverSound, explosionSound, laserSound); 
    
    const player = new Player(rocket, rocketContainer, gameArea, audioManager);
    
    const enemyFactory = new EnemyFactory(gameArea, enemyImages);
    
    const game = new Game(gameArea, player, enemyFactory, gameState, audioManager);

    gameState.addObserver(uiManager);
    gameState.addObserver(audioManager);
    
    game.start();

    restartButton.addEventListener('click', () => {
        audioManager.userHasInteracted();
        game.start();
    });

    function handleFirstInteraction() {
        audioManager.userHasInteracted();
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('click', handleFirstInteraction);
    }
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('click', handleFirstInteraction);
});