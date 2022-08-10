class Obstacles {
  constructor(ctx) {
    this.ctx = ctx;
    this.bearWidth = 298;
    this.bearHeight = 198;
    this.bearImg = new Image();
    this.bearImg.src = "images/osoBueno.png";
    this.enemyRate = 150;
    this.enemyV = -1;
    this.bears = [];
  }
  init() {
    this.bears = [];
    this.enemyRate = 150;
    this.enemyV = -8;
    this.bears.forEach((bear) => (bear.x = 1500));
  }

  move(frameNumber) {
    if (frameNumber < 100) return;

    if (frameNumber % this.enemyRate === 0) {
      const bearPosition = Math.floor((Math.random() * (this.ctx.canvas.width)) + this.ctx.canvas.width);
     // const bearPosition = this.ctx.canvas.width + this.ctx.canvas.width;
      this.bears.push(this.getBear(bearPosition));
    }
    this.bears.forEach((bear) => (bear.x += bear.vx));
  }

  // increaseDifficulty(frameNumber) {

 // (frameNumber % 500 === 0 && frameNumber !== 0) {
  //this.enemyRate -= 6;
  // this.enemyV -= 0.5;
  //  }
  // }

  setSpriteFrame(bear, frameNumber) {
    if (frameNumber % 20 === 0) {
      bear.spriteCol += 1;

      if (bear.spriteCol >= bear.spriteColumns) {
        bear.spriteCol = 0;
      }
      bear.spriteX = bear.width * bear.spriteCol;
      bear.spriteY = bear.height * 0;
    }
  }
  getBear(position) {
    const newBear = {
      x: position,
      y: 600,
      vx: this.enemyV,
      vy: 0,
      width: this.bearWidth,
      height: this.bearHeight,
      spriteColumns: 3,
      spriteCol: 0,
      spriteX: 0,
      spriteY: 0,
    };
    return newBear;
  }

  draw(frameNumber) {
    this.bears.forEach((bear) => {
      this.setSpriteFrame(bear, frameNumber);
      this.ctx.drawImage(
        this.bearImg,
        bear.spriteX,
        bear.spriteY,
        bear.width,
        bear.height,
        bear.x,
        bear.y,
        bear.width,
        bear.height
      );
    });
  }
}
