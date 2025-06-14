// === DOM SELECTION ===
const mainCar = document.querySelector('#main-car');
const cars = document.querySelectorAll('.fall-box');
const restartGame = document.querySelector('#restart-btn');
const displayScore = document.querySelector('#score');
const gameOverContainer = document.querySelector('#game-over');

// === INITIAL STATE ===
let positionHori = 25; // Horizontal position in %
let score = 0;
let gameOver = false;
const lanes = ['0%', '25%', '50%', '75%']; // 3 lanes

const moveRight = document.querySelector('#right-btn');
const moveLeft = document.querySelector('#left-btn');


// === HANDLE PLAYER MOVEMENT ===
document.addEventListener("keydown", (e) => {
    if ((e.key === "ArrowRight" || e.key === "d") && positionHori < 75) {
        positionHori += 25;
        mainCar.style.left = `${positionHori}%`;
    }
    
    if ((e.key === "ArrowLeft" || e.key === "a") && positionHori > 0) {
        positionHori -= 25;
        mainCar.style.left = `${positionHori}%`;
    }
});

// === COLLISION DETECTION ===
function checkCollision(box, mainCar) {
    const boxRect = box.getBoundingClientRect();
    const carRect = mainCar.getBoundingClientRect();
    
    return !(
        boxRect.bottom < carRect.top ||
        boxRect.top > carRect.bottom ||
        boxRect.right < carRect.left ||
        boxRect.left > carRect.right
    );
}

// === SCORE FUNCTION ===
function increaseScore() {
    score++;
    displayScore.textContent = score;
}

// === FALLING CARS ===
cars.forEach((box, index) => {
    function startFalling() {
        let pos = -200; // start above the screen
        const speed = 2;
        
        // Set initial random lane
        box.style.left = lanes[Math.floor(Math.random() * lanes.length)];
        
        function animate() {
            if (gameOver) return; // Stop falling if game over
            
            pos += speed;
            box.style.top = pos + 'px';
            
            // Check for collision
            if (checkCollision(box, mainCar)) {
                gameOver = true;
                gameOverContainer.classList.remove('hidden');
                gameOverContainer.classList.add('flex');
                return;
            }
            
            // If car moves off screen, reset position and lane
            if (pos > 500) {
                pos = -200;
                box.style.left = lanes[Math.floor(Math.random() * lanes.length)];
                increaseScore();
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    // Stagger fall start time for each box
    setTimeout(startFalling, index * 1000);
});


// === Mobile Button Control ===
moveRight.addEventListener('click', (e) => {
    
    if (positionHori < 75) {
        positionHori += 25;
        mainCar.style.left = `${positionHori}%`;
    }
    
});

moveLeft.addEventListener('click', (e) => {
    if (positionHori > 0) {
        positionHori -= 25;
        mainCar.style.left = `${positionHori}%`;
    }
});

// === RESTART GAME BUTTON ===
restartGame.addEventListener('click', () => {
    location.reload(); // Reloads the page to restart game
});