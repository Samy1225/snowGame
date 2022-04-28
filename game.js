class Game {
  constructor(ctx, player, obstacles, background) {
    this.ctx = ctx;
    this.player = player;
    this.obstacles = obstacles;
    this.background = background;
    this.frameNumber = 0;
    this.score = 0;
    this.frames = 0;
    this.sounds = new Sounds();

    document.addEventListener("keydown", (event) => {
      if (event.repeat) return;
      if (event.code === "Space") {
        this.player.jump(this.frameNumber);
      }
    });
  }

  start() {
    this.init();
    this.play();
  }

  init() {
    if (this.frameNumber) this.stop();
    this.sounds.play("main");
    this.ctx.canvas.height = window.innerHeight;
    this.ctx.canvas.width = window.innerWidth;
    this.frameNumber = 0;
    this.frames = 0;
    this.obstacles.bears = [];
    console.log(this.frameNumber);
    this.score = 0;
    this.background.init();
    this.player.init();
    this.obstacles.init();
  }

  play() {
    this.move();
    this.draw();
    this.scoreUpdate();
    this.increaseDifficulty();
    if (this.checkCollisions()) {
      console.log("ooppsssss");
      this.gameOver();
    }
    if (this.frameNumber !== null) {
      this.frameNumber = requestAnimationFrame(this.play.bind(this));
    }
    this.obstacles.bears.forEach((enemy) => console.log("bear", enemy.vx));

    console.log("FRAMENUMBER", this.frameNumber);
    console.log("FRAMES", this.frames);
  }

  stop() {
    cancelAnimationFrame(this.frameNumber);
    this.frameNumber = null;
  }

  move() {
    this.frames++;
    this.player.move(this.frames);
    this.background.move(this.frames);
    this.obstacles.move(this.frames);
  }

  checkCollisions() {
    let collisions = false;

    if (this.obstacles.bears.some((bear) => this.player.collidesWith(bear))) {
      collisions = true;
    }
    return collisions;
  }

  increaseDifficulty() {
    this.obstacles.increaseDifficulty(this.frameNumber);
  }

  draw() {
    this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.background.draw(this.frameNumber);
    this.obstacles.draw(this.frameNumber);
    this.player.draw(this.frameNumber);
    this.drawScore();
  }
  scoreUpdate() {
    if (this.frameNumber !== 0 && this.frameNumber % 20 === 0) this.score += 1;
  }

  drawScore() {
    this.ctx.save();
    this.ctx.fillStyle = "45009";
    this.ctx.font = "bold 24px 'Press Start 2P'";
    this.ctx.fillText(`SCORE: ${this.score}`, 50, 70);
    this.ctx.restore();
  }

  reset() {
    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx);
    this.sounds.play("main");
  }
  gameOver() {
    this.sounds.play("gameover");
    this.stop();
    this.ctx.fillStyle = "rgba(69,0,154,0.7)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.font = "bold 32px 'Press Start 2P";
    this.ctx.fillText(
      "You are a loser Mister Pinguin, try again!",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2,
    );
    this.ctx.restore();
  }
}
