// window.onload = function () {
//   const game = newPhaser.Game();
// };

class Game {
  constructor() {
    this.gameIntro = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.width = 1200;
    this.height = 800;

    this.ball;
    this.player;
    this.obstacle;
    this.score = 0;
    this.minutes = minutes;
    this.gameOver = false;
  }
  start() {
    this.gameIntro.style.display = `none`;
    this.gameScreen.style.display = `block`;
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;

    this.player = new Player(this.gameScreen);
    this.ball = new Ball(this.gameScreen, this.player);
    this.player.ball = this.ball;
    this.obstacle = new obstacle(this.gameScreen);
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.currentFrame += 1;
      this.player.render();
      document.getElementById("score").innerText = this.score;

      if (this.gameOver) {
        this.player.element.remove();
        this.obstacle.forEach((currentObstacle) => {
          currentObstacle.element.remove();
        });
        this.gameScreen.style.display = "none";
        this.endScreen.style.display = "block";
        clearInterval(this.intervalId);
      }
    }, 1000 / 60);
  }
}
