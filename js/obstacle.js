class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 40;
    this.height = 40;
    this.top = -this.gameScreen.clientHeight / 2 - this.height;
    this.left = 200;
    Math.round(
      Math.random() * (this.gameScreen.clientWidth - this.width - 100)
    ) + 50;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 1;
    this.direction = Math.random() < 0.5 ? -1 : 1;
    this.element = document.createElement("img");

    this.element.src = "images/redDot.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.position = "absolute";

    this.gameScreen.appendChild(this.element);
  }

  render() {
    // this.left += this.directionX * this.speed;
    // this.top += this.directionY * this.speed;
    if (this.top <= 0) {
      this.top = 0;
      this.direction = 10; // Reverse direction when reaching the top
    } else if (this.top >= this.gameScreen.clientHeight - this.height) {
      this.top = this.gameScreen.clientHeight - this.height;
      this.direction = -10; // Reverse direction when reaching the bottom
    }
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }

  move() {
    this.top += this.speed * this.direction;

    this.element.style.top = `${this.top}px`;

    // Reverse the direction if the obstacle reaches the left or right boundary
    if (
      this.top <= 0 ||
      this.top >= this.gameScreen.clientHeight - this.height
    ) {
      this.direction *= -1;
    }

    //     this.positionX += this.speed * this.direction;
    //     this.element.style.left = `${this.positionX}px`;

    //     if (
    //       this.positionX <= 0 ||
    //       this.positionX >= this.gameScreen.clientWidth - this.width
    //     ) {
    //       this.direction *= -1;
    //     }
  }
  //   didCollide(player) {
  //     const obstacleRect = this.element.getBoundingClientRect();
  //     const playerRect = player.element.getBoundingClientRect();

  // if (
  //   obstacleRect.left < playerRect.right &&
  //   obstacleRect.right > playerRect.left &&
  //   obstacleRect.top < playerRect.bottom &&
  //   obstacleRect.bottom > playerRect.top
  // ) {
  //   this.gameScreen.style.display = "none";
  //   this.endScreen.style.display = "block";

  //   const restartButton = document.getElementById("restart-button");

  //   restartButton.addEventListener("click", () => {
  //     // Restart the game (for now, just reload the page)
  //     location.reload();
  //   });
  // }
}
