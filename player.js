class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 150;
    this.height = 110;
    this.x = 100;
    this.y = 400;
    this.vy = 0; // velocity
    this.ay = 0.6; // gravity

    this.img = new Image();
    this.img.src = "images/pinguin.png";

    this.spriteColumns = 3;
    this.spriteRows = 1;

    this.spriteCol = 0;
    this.spriteRow = 0;
    this.spriteX = 0;
    this.spriteY = 0;
  }
  init() {
    // iniciation velocity
    this.x = -400;
    this.spriteCol = 0;
    this.spriteRow = 0;
    this.spriteX = 0;
    this.spriteY = 0;
  }
  move(frameNumber) {
    let velocity = 2;
    if (this.x < 200) {
      this.x += velocity;
    }
    this.vy += this.ay;
    this.y += this.vy;
    if (this.y > 640) this.y = 640;
    if (this.y < 40) this.y = 40;
  }

  setSpriteFrame(frameNumber) {
    if (frameNumber % 15 === 0) {
      this.spriteCol += 1;

      if (this.spriteCol >= this.spriteColumns) {
        this.spriteCol = 0;
      }
      this.spriteX = this.width * this.spriteCol;
      this.spriteY = this.height * this.spriteRow;
    }
  }
  jump(frameNumber) {
    if (this.y === 640) this.vy = -30;
  }
  draw(frameNumber) {
    this.setSpriteFrame(frameNumber);
    this.ctx.drawImage(
      this.img,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  /// dudaa
  collidesWith(object) {
    return (
      this.x <= object.x + object.width &&
      this.x + this.width >= object.x &&
      this.y <= object.y + object.height &&
      this.y + this.height >= object.y
    );
  }
}
