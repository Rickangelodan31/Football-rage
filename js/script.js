window.addEventListener("load", () => {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game;

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function () {
    startGame();
    // Last option in case you have problems on the restart => window.location.reload()
  });

  document.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "KeyW":
        game.player.move("UP");
        break;
      case "KeyS":
        game.player.move("DOWN");
        break;
      case "KeyA":
        game.player.move("LEFT");
        break;
      case "KeyD":
        game.player.move("RIGHT");
        break;
      case "Space": // Example: Kick ball when space key is pressed
        game.player.kickBall("kick");
        break;
      case "keyUp":
        game.player.move("STOP");
    }

    document.addEventListener("keyup", (event) => {
      switch (event.code) {
        case "KeyW":
          if (game.player.directionY === -1) game.player.move("STOPY");
          break;
        case "KeyS":
          if (game.player.directionY === 1) game.player.move("STOPY");
          break;
        case "KeyA":
          if (game.player.directionX === -1) game.player.move("STOPX");
          break;
        case "KeyD":
          if (game.player.directionX === 1) game.player.move("STOPX");
          break;
        case "Space":
      }
    });
  });
});
