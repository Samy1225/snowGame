const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const player = new Player(ctx);
const background = new Background(ctx);
const obstacles = new Obstacles(ctx);

const game = new Game(ctx, player, obstacles, background);

const startButton = document.getElementById('start-button');
const title = document.getElementById('title');

startButton.addEventListener(
    'click', () => {
        startButton.textContent = 'RESTART';
        startButton.classList.toggle("hidden");
        title.classList.add('hidden');
        startButton.blur();
        game.start();
    }
)

console.log('what');

//here is the link of the funcionalities with the button start .