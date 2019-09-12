const canvas = document.getElementById('setopati');

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

resize();

const context = canvas.getContext('2d');

const boiRunningSprite = new Sprite({
	src: 'assets/img/running.png',
	width: 695/5,
	height: 558/2,
	scale: 0.15,
	numFramesX: 5,
	totalFrames: 10,
});

const boiIdleSprite = new Sprite({
	src: 'assets/img/running.png',
	width: 695/5,
	height: 558/2,
	scale: 0.15,
});

const boiKickingSprite = new Sprite({
	src: 'assets/img/kicking.png',
	width: 1395/5,
	height: 867/3,
	scale: 0.15,
	numFramesX: 5,
});

const boiJumpingSprite = new Sprite({
	src: 'assets/img/jumping.png',
	width: 760/5,
	height: 544/2,
	scale: 0.15,
	numFramesX: 5,
	totalFrames: 8,
	loop: false,
	fps: 1,
});

const boiFightingSprite = new Sprite({
	src: 'assets/img/fighting.png',
	width: 1195/5,
	height: 1120/4,
	scale: 0.15,
	numFramesX: 5,
	totalFrames: 17,
});

const groundSprite = new Sprite({
	src: 'assets/img/ground.png',
	width: 32,
	height: 32,
});

const blockCollider = { width: 32, height: 32 };
const verticalBlockCollider = { width: 2, height: 32 };
const horizontalBlockCollider = { width: 32, height: 2 };
const blockMaterial = { type: MaterialType.STATIC };

const boiCollider = { width: 695/5 * 0.15, height: 558/2 * 0.15 };
const boiMaterial = { type: MaterialType.DYNAMIC };

entities = [];

let lastTime = undefined;

const input = {};

const physics = new Physics({ gravity: 9.8 });

new Level(levelOne);

window.onload = () => {
	document.addEventListener('keydown', (event) => {
		input[event.keyCode] = true;
		// console.log(event.keyCode);
	}, false);

	document.addEventListener('keyup', (event) => {
		input[event.keyCode] = false;
	}, false);
};

window.onresize = resize;

function gameLoop(time) {
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (lastTime) {
		const dt = (time - lastTime) / 1000;
		entities.forEach((entity) => {
			entity.update(dt);
		});

		physics.update(dt);

		entities.forEach((entity) => {
			entity.draw(context);
		});
	}

	lastTime = time;
	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
