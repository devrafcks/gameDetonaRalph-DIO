const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        score: document.querySelector(".score"),
        timeLeft: document.getElementById("time-left"),
        lives: document.querySelector(".lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
        lives: 3,
    },
    actions: {
        timerId: null,
        countDownTimerId: null,
    },
};

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = 0.2;
    audio.play();
}

function updateLivesDisplay() {
    state.view.lives.textContent = `x${state.values.lives}`;
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0 || state.values.lives <= 0) {
        endGame();
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a");
            } else {
                state.values.lives--;
                updateLivesDisplay();
                playSound("erro.mp3");

                if (state.values.lives <= 0) {
                    endGame();
                }
            }
        });
    });
}

function resetGameValues() {
    state.values.result = 0;
    state.values.currentTime = 30;
    state.values.lives = 3;
    updateLivesDisplay();
    state.view.score.textContent = state.values.result;
    state.view.timeLeft.textContent = state.values.currentTime;
}

function endGame() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Fim de jogo! O seu resultado foi: " + state.values.result);

    resetGameValues();
    startGame();
}

function startGame() {
    randomSquare();
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function init() {
    addListenerHitBox();
    resetGameValues();
    startGame();
}

init();
