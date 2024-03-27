class Ball {
  constructor(gameScreen, player) {
    this.gameScreen = gameScreen;
    this.width = 30;
    this.height = 30;
    this.top = this.gameScreen.clientHeight / 2 - this.height / 2;
    this.left = this.gameScreen.clientWidth / 2 - this.width / 2;
    this.speed = 3;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.player = player;
    this.obstacle = obstacle;

    this.element.src = "images/football.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    // this.element.style.background = "red";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.position = "absolute";

    this.gameScreen.appendChild(this.element);
  }

  carriedBy(player) {
    // When the ball is carried by a player, position it relative to the player
    this.element.style.top = `${player.top /* - this.height */}px`;
    this.element.style.left = `${player.left + player.width}px`;
  }

  kick(directionX, directionY) {
    // Apply force to the ball towards the goal based on direction
    this.directionX = directionX;
    this.directionY = directionY;
  }
}
