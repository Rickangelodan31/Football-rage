// window.onload = function () {
//   const game = newPhaser.Game();
// };

class Game {
  constructor() {
    this.gameIntro = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.width = 1100;
    this.height = 800;
    this.intervalId;
    this.timerIntervalId; // Store the interval ID for the timer
    this.remainingMinutes = 90; // Total game time in minutes

    this.ball;
    this.player;
    this.obstacle;
    this.score = 0;
    this.minutes;
    this.gameOver = false;
    this.endScreen = document.getElementById("game-end");
    this.goalPositionYMin = this.height / 2 - 50;
    this.goalPositionYMax = this.height / 2 + 50;
    this.goalPositionX = this.width - 100;
    this.goalCommentaryAudio = new Audio("audio/goalcommentary.mp3");
    this.gameOverAudio = new Audio("audio/gameover.mp3");
    this.gameStartAudio = new Audio("audio/gamestart.mp3");

    // this.didcollide = new didCollide(gameScreen);
  }
  start() {
    this.gameIntro.style.display = `none`;
    this.gameScreen.style.display = `block`;

    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;

    this.player = new Player(this.gameScreen);
    this.ball = new Ball(this.gameScreen, this.player);
    this.player.ball = this.ball;
    this.obstacle = new Obstacle(this.gameScreen);
    this.gameStartAudio.play();

    this.startTimer();

    this.animate();
  }
  animate() {
    this.intervalId = setInterval(() => {
      this.currentFrame += 1;
      this.player.render();
      this.obstacle.move();
      this.obstacle.render();

      if (
        this.player.left >= this.goalPositionX &&
        this.player.top >= this.goalPositionYMin &&
        this.player.top <= this.goalPositionYMax
      ) {
        this.score++;
        document.getElementById("score").innerText = this.score;

        if (this.score % 1 === 0) {
          this.playGoalCommentary();
        }
        if (this.score === 3) {
          this.gameOver = true;
        }
        this.player.resetPosition();

        /* if (
          this.player.left <= this.goalPositionX &&
          this.player.top <= this.goalPositionY
        ) {
          if (
            this.player.left >= this.goalPositionX - 10 &&
            this.player.left <= this.goalPositionX + 10 &&
            this.player.top >= this.goalPositionY - 10 &&
            this.player.top <= this.goalPositionY + 10
          ) {
            // Player reached near the goal, reset to starting position
            this.player.resetPosition(); // Assuming there's a method to reset the player's position
          }
        } */
      }
      if (this.player.didCollide(this.obstacle)) {
        this.gameOverAudio.play(); // Play the game over audio
        this.gameOver = true;

        this.gameStartAudio.pause();
        this.gameStartAudio.currentTime = 0;
      }

      if (this.gameOver) {
        this.player.element.remove();
        this.obstacle.element.remove();
        this.ball.element.remove();
        this.gameScreen.style.display = "none";
        this.endScreen.style.display = "block";
        clearInterval(this.intervalId);
        clearInterval(this.timerIntervalId);
      }
    }, 1000 / 60);
  }

  playGoalCommentary() {
    console.log("Playing goal commentary...");
    this.goalCommentaryAudio.play();
  }
  startTimer() {
    // Update the minutes display every minute
    this.timerIntervalId = setInterval(() => {
      this.remainingMinutes--; // Decrement remaining minutes
      document.getElementById("minutes").innerText = this.remainingMinutes; // Update the display
      if (this.remainingMinutes <= 0) {
        // If time runs out, end the game
        clearInterval(this.timerIntervalId);
        this.endGame();
      }
    }, 1000); // Run every 1 minute (6000 milliseconds)
  }
  addObstacle() {
    const newObstacle = new Obstacle(this.gameScreen);
    if (this.obstacles.length % 2 === 0) {
      // Even-numbered obstacle, move upward
      newObstacle.direction = -1;
    } else {
      // Odd-numbered obstacle, move downward
      newObstacle.direction = 1;
    }
    this.obstacles.push(newObstacle);
  }
  endGame() {
    clearInterval(this.timerIntervalId);
    // Perform actions to end the game
    this.gameScreen.style.display = "none";
    this.endScreen.style.display = "block";
    // You can add more actions here such as displaying score, restart button, etc.
  }

  resetGame() {
    this.gameIntro = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.width = 1100;
    this.height = 800;
    this.remainingMinutes = 90;
    this.ball;
    this.player;
    this.obstacle;
    this.score = 0;
    this.minutes;
    this.gameOver = false;
    this.endScreen = document.getElementById("game-end");
    this.goalPositionYMin = this.height / 2 - 50;
    this.goalPositionYMax = this.height / 2 + 50;
    this.goalPositionX = this.width - 100;
    this.goalCommentaryAudio = new Audio("audio/goalcommentary.mp3");
    this.gameOverAudio = new Audio("audio/gameover.mp3");
    this.gameStartAudio = new Audio("audio/gamestart.mp3");
  }
}
