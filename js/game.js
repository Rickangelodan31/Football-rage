// window.onload = function () {
//   const game = newPhaser.Game();
// };

class Game {
  constructor() {
    this.gameIntro = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.width = 1000;
    this.height = 600;
    this.intervalId;

    this.ball;
    this.player;
    this.obstacle;
    this.score = 0;
    this.minutes = minutes;
    this.gameOver = false;
    this.endScreen = document.getElementById("game-end");

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

    this.animate();
  }
  animate() {
    this.intervalId = setInterval(() => {
      this.currentFrame += 1;
      this.player.render();
      this.obstacle.move();
      this.obstacle.render();
      if (this.ball.left > this.gameScreen.clientWidth) {
        this.score++;
        document.getElementById("score").innerText = this.score;
        if (
          this.player.left <= this.goalPositionX &&
          this.player.top <= this.goalPositionY
        ) {
          // Player reached the goal, transition to the next stage
          this.transitionToNextStage();
        }
      }
      if (this.player.didCollide(this.obstacle)) {
        // Handle collision
        this.gameOver = true;
      }

      if (this.gameOver) {
        this.player.element.remove();
        this.obstacle.element.remove();
        this.ball.element.remove();
        this.gameScreen.style.display = "none";
        this.endScreen.style.display = "block";
        clearInterval(this.intervalId);
      }
    }, 1000 / 60);
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
    // Perform actions to end the game
    this.gameScreen.style.display = "none";
    this.gameOverScreen.style.display = "block";
    // You can add more actions here such as displaying score, restart button, etc.
  }
}
