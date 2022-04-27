class Game {
  constructor(ctx, player, obstacles, background) {
    this.ctx = ctx;
    this.player = player;
    this.obstacles = obstacles;
    this.background = background;
    this.frameNumber = 0;
    this.score = 0;
    this.frames = 0;

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
    this.ctx.canvas.height = window.innerHeight;
    this.ctx.canvas.width = window.innerWidth;
    this.frameNumber = 0;
    this.frames = 0;
    this.obstacles.pinguins = [];
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
     // this.gameOver();
    }
    if (this.frameNumber !== null) {
      this.frameNumber = requestAnimationFrame(this.play.bind(this));
    }
    this.obstacles.pinguins.forEach(enemy => console.log('pinguin', enemy.vx))

    console.log('FRAMENUMBER',this.frameNumber)
        console.log('FRAMES',this.frames)
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

    if (
      this.obstacles.pinguins.some((pinguin) => this.player.collidesWith(pinguin))
    ) {
      collisions = true;
    }
    return collisions
  }

  increaseDifficulty(){
    this.obstacles.increaseDifficulty(this.frameNumber)
  }

  draw() {
    this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.background.draw(this.frameNumber);
    this.obstacles.draw(this.frameNumber);
    this.player.draw(this.frameNumber);
  }
  scoreUpdate() {
    if (this.frameNumber !== 0 && this.frameNumber % 20 === 0) this.score++;
  }

  drawScore() {
    this.ctx.save();
    this.ctx.fillStyle = "45009";
    this.ctx.font = "bold 24px 'Press Start 2P'";
    this.ctx.fillText(`SCORE: ${this.score}`, 30, 50);
    this.ctx.restore();
  }
}
