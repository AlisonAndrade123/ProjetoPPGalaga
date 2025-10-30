# Jogo Galaga com Padrões de Projeto

Este projeto é uma recriação do clássico jogo de arcade Galaga, desenvolvido com foco em uma arquitetura de software robusta, modular e extensível. O principal objetivo foi aplicar cinco Padrões de Projeto (Design Patterns) fundamentais para estruturar o código de forma limpa e desacoplada.

<img width="1852" height="951" alt="Captura de tela de 2025-10-30 07-30-37" src="https://github.com/user-attachments/assets/1bd80a6f-ad7e-4a61-9eaa-648fb9f80200" />

---

<img width="1852" height="951" alt="Captura de tela de 2025-10-30 07-38-35" src="https://github.com/user-attachments/assets/505c0ee0-2064-45bf-905b-edb394e87a65" />

---

### Como Executar

Para rodar o projeto, é necessário utilizar um servidor web local. A forma mais simples é usar a extensão **"Live Server"** do Visual Studio Code.

Isso é necessário porque o projeto utiliza Módulos JavaScript (`type="module"`), que possuem uma política de segurança (CORS) que impede o carregamento de arquivos diretamente do sistema de arquivos (`file:///...`).

---

### Arquitetura e Padrões de Projeto

A arquitetura do jogo foi construída sobre cinco Padrões de Projeto, cada um com uma responsabilidade clara para garantir um sistema coeso e de fácil manutenção.

#### 1. Singleton (Instância Única)
*   **O que faz?** Garante que uma classe tenha apenas uma única instância e fornece um ponto de acesso global a ela.
*   **Aplicação no projeto:** Usado na classe **`GameState.js`** para criar uma fonte única e confiável para o estado do jogo (pontuação, vidas, status de game over). Isso evita inconsistências e o uso de variáveis globais desprotegidas.

#### 2. Observer (Observador)
*   **O que faz?** Permite que um objeto (Subject) notifique automaticamente uma lista de outros objetos (Observers) sobre mudanças de estado.
*   **Aplicação no projeto:** Usado para desacoplar a lógica do jogo da interface e do áudio. O **`GameState`** atua como *Subject*, enquanto o **`UIManager.js`** e o **`AudioManager.js`** são *Observers*. Quando as vidas ou a pontuação mudam, a UI e o áudio reagem automaticamente, sem que o `GameState` precise conhecê-los.

#### 3. Factory (Fábrica)
*   **O que faz?** Centraliza e encapsula a lógica de criação de objetos.
*   **Aplicação no projeto:** Implementado na classe **`EnemyFactory.js`**. Sua única responsabilidade é criar e configurar novos inimigos. Isso simplifica o loop principal do jogo e torna extremamente fácil adicionar novos tipos de inimigos no futuro, sem alterar o resto do código.

#### 4. Facade (Fachada)
*   **O que faz?** Fornece uma interface simplificada e unificada para um sistema complexo.
*   **Aplicação no projeto:** A classe **`Game.js`** atua como uma fachada. Ela esconde a complexidade de coordenar o jogador, os inimigos, as colisões e o estado do jogo. O ponto de entrada da aplicação (`main.js`) apenas precisa interagir com métodos simples como `game.start()`, tornando o sistema mais fácil de usar.

#### 5. Dependency Injection (Injeção de Dependência)
*   **O que faz?** Um objeto recebe suas dependências de uma fonte externa, em vez de criá-las.
*   **Aplicação no projeto:** É o pilar que conecta toda a arquitetura. O arquivo **`main.js`** funciona como o *Composition Root*, onde todas as instâncias de classes (módulos) são criadas e "injetadas" umas nas outras através de seus construtores (ex: `new Game(..., audioManager)`, `new Player(..., audioManager)`). Isso reduz drasticamente o acoplamento e torna o código altamente modular e testável.

---

### Estrutura de Arquivos

O projeto está organizado da seguinte forma para separar as responsabilidades:

```
/galaga
|-- /audio/       # Efeitos sonoros e música
|-- /css/         # Arquivos de estilo (CSS)
|-- /img/         # Imagens
|-- /js/          # Todo o código JavaScript modularizado
|   |-- AudioManager.js
|   |-- EnemyFactory.js
|   |-- Game.js
|   |-- GameState.js
|   |-- main.js
|   |-- Player.js
|   `-- UIManager.js
|
|-- game.html     # Arquivo principal do jogo
`-- README.md     # Documentação do projeto
```
