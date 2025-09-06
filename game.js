const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const carImg = new Image();
carImg.src = 'car.png';

const car = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 100,
    width: 40,
    height: 80,
    speed: 5
};

const obstacles = [];
let score = 0;
let gameOver = false;

// 🎵 Achtergrondmuziek en geluidseffecten
const music = new Audio('music.mp3');
const scoreSound = new Audio('score.mp3'); // Geluid bij scoreverhoging
const crashSound = new Audio('crash.mp3'); // Geluid bij botsing

music.loop = true;
music.volume = 0.5;

// 🎨 Functie om random kleuren te genereren
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 🛑 Reset het spel bij Game Over
function resetGame() {
    score = 0;
    car.x = canvas.width / 2 - 20;
    obstacles.length = 0;
    gameOver = false;
    music.play(); // Speel de muziek opnieuw af bij herstart
    updateGame();
}

// 🚧 Obstakels genereren
function createObstacle() {
    if (!gameOver) {
        const obstacle = {
            x: Math.random() * (canvas.width - 40),
            y: -80,
            width: 40,
            height: 80,
            speed: 3,
            color: getRandomColor()
        };
        obstacles.push(obstacle);
    }
}

setInterval(createObstacle, 2000);

// 🎮 Besturing met pijltjestoetsen
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && car.x > 0) {
        car.x -= car.speed;
    } else if (event.key === 'ArrowRight' && car.x < canvas.width - car.width) {
        car.x += car.speed;
    }
});

// 🚗 Auto tekenen
function drawCar() {
    ctx.drawImage(carImg, car.x, car.y, car.width, car.height);
}

// 🚧 Obstakels tekenen & beweging
function drawObstacles() {
    obstacles.forEach((obstacle, index) => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        obstacle.y += obstacle.speed;

        if (obstacle.y > canvas.height) {
            obstacles.splice(index, 1);
            score++; // Score verhogen per succesvol ontwijkt obstakel
            scoreSound.play(); // Speel geluid bij scoreverhoging
        }
    });
}

// 💥 Botsingsdetectie
function checkCollision() {
    obstacles.forEach(obstacle => {
        if (
            car.x < obstacle.x + obstacle.width &&
            car.x + car.width > obstacle.x &&
            car.y < obstacle.y + obstacle.height &&
            car.y + car.height > obstacle.y
        ) {
            gameOver = true;
            crashSound.play(); // Speel crash-geluid bij botsing
            setTimeout(() => {
                alert(`Game Over! Je eindscore: ${score}`);
                resetGame();
            }, 100);
        }
    });
}

// 🏆 Score tekenen
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// 🔄 Game loop
function updateGame() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCar();
        drawObstacles();
        drawScore();
        checkCollision();
        requestAnimationFrame(updateGame);
    }
}

// 🔊 Start achtergrondmuziek
music.play();

updateGame();
