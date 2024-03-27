class obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 40;
    this.height = 40;
    this.top = -this.gameScreen.clientHeight / 2 - this.height;
    this.right =
      Math.round(
        Math.random() * (this.gameScreen.clientWidth - this.width - 100)
      ) + 50;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 1;
    this.direction = Math.random() < 0.5 ? -1 : 1;
    this.element = document.createElement("img");

    this.element.src = "../images/redDot.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.position = "absolute";

    this.gameScreen.appendChild(this.element);
  }

  render() {
    this.move();
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }

  move() {
    this.positionX += this.speed * this.direction;
    this.element.style.left = `${this.positionX}px`;

    if (
      this.positionX <= 0 ||
      this.positionX >= this.gameScreen.clientWidth - this.width
    ) {
      this.direction *= -1;
    }
  }
}
