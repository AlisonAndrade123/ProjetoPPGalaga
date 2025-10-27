// js/main.js - ATUALIZADO com som de Game Over

// Ponto de entrada que monta e inicia o jogo (Dependency Injection).

import GameState from './GameState.js';
import UIManager from './UIManager.js';
import Player from './Player.js';
import EnemyFactory from './EnemyFactory.js';
import Game from './Game.js';
import AudioManager from './AudioManager.js';

window.addEventListener('load', () => {
    // --- 1. Obter referências aos elementos do DOM ---
    const gameArea = document.getElementById('gameArea');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const livesDisplay = document.getElementById('livesDisplay');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalScoreDisplay = document.getElementById('finalScore');
    const restartButton = document.getElementById('restartButton');
    const rocket = document.getElementById('rocket');
    const rocketContainer = document.getElementById('rocketContainer');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const gameOverSound = document.getElementById('gameOverSound'); // 1. PEGA O NOVO ELEMENTO DE SOM
    
    const enemyImages = ['icone1.png', 'icone2.png', 'icone3.png', 'icone4.png'];

    // --- 2. Criar as instâncias das classes (módulos) ---
    const gameState = new GameState(); // Singleton
    const uiManager = new UIManager(scoreDisplay, livesDisplay, gameOverScreen, finalScoreDisplay);
    const player = new Player(rocket, rocketContainer, gameArea);
    const enemyFactory = new EnemyFactory(gameArea, enemyImages);
    // 2. ATUALIZA A CRIAÇÃO DO AUDIOMANAGER, PASSANDO OS DOIS SONS
    const audioManager = new AudioManager(backgroundMusic, gameOverSound); 
    
    // --- 3. Criar a instância do jogo principal (Facade) ---
    const game = new Game(gameArea, player, enemyFactory, gameState);

    // --- 4. Configurar os Observers ---
    gameState.addObserver(uiManager);
    gameState.addObserver(audioManager);
    
    // --- 5. Iniciar o Jogo ---
    game.start();

    // --- 6. Configurar o botão de reiniciar ---
    restartButton.addEventListener('click', () => {
        audioManager.userHasInteracted();
        game.start();
    });

    // --- 7. Lógica para iniciar a música na primeira interação do usuário ---
    function handleFirstInteraction() {
        audioManager.userHasInteracted();
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('click', handleFirstInteraction);
    }
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('click', handleFirstInteraction);
});