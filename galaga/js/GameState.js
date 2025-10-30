// Implementa os padrões Singleton e Observer para gerenciar o estado global do jogo.

let instance = null;

export default class GameState {
    constructor() {
        if (instance) {
            return instance;
        }

        this.observers = [];
        
        this.reset();
        
        instance = this;
    }

    reset() {
        this.score = 0;
        this.lives = 5;
        this.isGameOver = false;
        this.notifyObservers();
    }

    addScore(points) {
        if (this.isGameOver) return;
        this.score += points;
        this.notifyObservers();
    }

    loseLife() {
        if (this.isGameOver) return;
        this.lives--;
        if (this.lives <= 0) {
            this.isGameOver = true;
        }
        this.notifyObservers();
    }

    endGame() {
        this.isGameOver = true;
        this.notifyObservers();
    }
    
    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}