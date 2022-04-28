class Sounds {
  main = new Audio("sounds/main.mp3");
  collision = new Audio("sounds/gameover.mp3");
  play(sounds) {
    this[sounds].play();
  }

  pause(sounds) {
    this[sounds].pause();
  }
}