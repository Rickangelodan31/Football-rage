class Player {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    this.width = 40;
    this.height = 40;
    this.top = this.gameScreen.clientHeight / 2 - this.height;
    this.left = 50;
    this.speed = 3;
    this.ball;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");

    this.element.src = "images/Bros.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    this.element.style.position = "absolute";

    this.gameScreen.appendChild(this.element);

    /* document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this)); */
  }
  render() {
    this.left += this.directionX * this.speed;
    this.top += this.directionY * this.speed;

    this.left = Math.max(
      Math.min(this.left, this.gameScreen.clientWidth - this.width)
    );
    this.top = Math.max(
      70,
      Math.min(this.top, this.gameScreen.clientHeight - this.height)
    );

    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;

    this.ball.carriedBy(this);
  }

  moving() {
    if (
      this.top >= 0 &&
      this.top <= this.gameScreen.clientHeight - this.height
    ) {
      this.top += this.directionY;
    }
    if (this.top <= 0) {
      this.top = 0;
    }
    if (this.top >= this.gameScreen.clientHeight - this.height) {
      this.top = this.gameScreen.clientHeight - this.height;
    }

    if (
      this.left >= 50 &&
      this.left <= this.gameScreen.clientWidth - this.width - 50
    ) {
      this.left += this.directionX;
    }
    if (this.left <= 50) {
      this.left = 50;
    }
    if (this.left >= this.gameScreen.clientWidth - this.width - 50) {
      this.left = this.gameScreen.clientWidth - this.width - 50;
    }
  }

  move(direction) {
    // Update player's movement direction based on input
    switch (direction) {
      case "LEFT":
        this.directionX = -1;
        break;
      case "RIGHT":
        this.directionX = 1;
        break;
      case "UP":
        this.directionY = -1;
        break;
      case "DOWN":
        this.directionY = 1;
        break;
      default:
        this.directionX = 0;
        this.directionY = 0;
    }
  }

  kickBall() {
    const goalX = 600;
    const goalY = 400;

    const playerX = this.left + this.width / 2;
    const playerY = this.top + this.height / 2;

    const dx = goalX - playerX;
    const dy = goalY - playerY;

    const length = Math.sqrt(dx * dx + dy * dy);
    const directionX = dx / length;
    const directionY = dy / length;

    this.ball.kick(directionX, directionY);
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
