class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.backgroundFront = {
      img: new Image(),
      height: window.innerHeight,
      width: window.innerWidth,
      x: 0,
      y: 0,
      vx: -5, // la velocidad del background
      vy: 0,
    };

    this.backgroundFront.img.src = "images/airadventure.png";
  }

  init() {
    this.backgroundFront.x = 0;
    this.backgroundFront.y = 0;
    this.backgroundFront.vx = -5;
  }

  move(frameNumber) {
    this.backgroundFront.x += this.backgroundFront.vx;
    if (this.backgroundFront.x + this.backgroundFront.width <= 0) this.backgroundFront.x = 0;
    
    /*  this.backgroundFront.x = -(((frameNumber % this.backgroundFront.width) / 2) * this.vx);
    console.log("infinite")  */
  }

  increaseVelocity(frameNumber) {
    if (frameNumber % 500 === 0 && frameNumber !== 0) {
      this.backgroundFront.vx -= 0.8;
    }
  }

  draw(frameNumber) {
    this.ctx.drawImage(
      this.backgroundFront.img,
      this.backgroundFront.x,
      this.backgroundFront.y,
      this.backgroundFront.width,
      this.backgroundFront.height
    );

    this.ctx.drawImage(
      this.backgroundFront.img,
      this.backgroundFront.x + this.backgroundFront.width,
      this.backgroundFront.y,
      this.backgroundFront.width,
      this.backgroundFront.height
    );
  }
}
