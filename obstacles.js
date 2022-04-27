class Obstacles {
  constructor(ctx) {
    this.ctx = ctx;
    this.pinguinWidth = 68;
    this.pinguinHeight = 108;
    this.pinguinImg = new Image();
    this.pinguinImg.src = "images/pinguin.png";
    this.enemyRate = 150;
    this.enemyV = -50;
    this.pinguins = [];
  }
  init() {
    this.pinguins = [];
    this.enemyRate = 150;
    this.enemyV = -50;
    this.pinguins.forEach(pinguin=> pinguin.x = 2000);
  }

  move(frameNumber) {
    if (frameNumber < 100) return;

    if (frameNumber % this.enemyRate === 0) {
      const pinguinPosition = Math.floor((Math.random() * (this.ctx.canvas.width)) + 1000);
      this.pinguins.push(this.getPinguin(pinguinPosition));
    }
    this.pinguins.forEach((pinguin) => (pinguin.x += pinguin.vx));
  }

  increaseDifficulty(frameNumber) {
    if (frameNumber % 500 === 0 && frameNumber !== 0) {
      this.enemyRate -= 6;
      this.enemyV -= 0.5;
    }
  }

  setSpriteFrame(pinguin, frameNumber) {
    if (frameNumber % 10 === 0) {
      pinguin.spriteCol += 1;

      if (pinguin.spriteCol >= pinguin.spriteColumns) {
        pinguin.spriteCol = 0;
      }
      pinguin.spriteX = pinguin.width * pinguin.spriteCol;
      pinguin.spriteY = pinguin.height * pinguin.spriteRow;
    }
  }
  getPinguin(position) {
    const newPinguin = {
      x: position,
      y: 320,
      vx: this.enemyV,
      vy: 0,
      width: this.pinguinWidth,
      height: this.pinguinHeight,

      spriteColumns: 4,
      spriteRows: 1,

      spriteCol: 0,
      spriteRow: 0,
      spriteX: 0,
      spriteY: 0,
    };
    return newPinguin;
  }

  draw(frameNumber) {
    this.pinguins.forEach((pinguin) => {
      this.setSpriteFrame(pinguin, frameNumber);
      this.ctx.drawImage(
        this.pinguinImg,
        pinguin.spriteX,
        pinguin.spriteY,
        pinguin.width,
        pinguin.height,
        pinguin.x,
        pinguin.y,
        pinguin.width,
        pinguin.height
      );
    });
  }
}
