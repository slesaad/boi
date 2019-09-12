class Player extends Entity {
	constructor(params) {
		super(params);
	}

	update(dt) {
		super.update(dt);

		const leftPressing = input[37] || input[65];
		const rightPressing = input[39] || input[68];

		const isGrounded = this.isGrounded();

		if (leftPressing) { // left arrow or A
			this.pos.x -= 200 * dt;
			this.scaleX = -1;
			this.sprite = this.sprites.running;
		}
		if (rightPressing) { // left arrow or A
			this.pos.x += 200 * dt;
			this.scaleX = 1;
			this.sprite = this.sprites.running;
		}

		if (!leftPressing && !rightPressing) {
			this.sprite = this.sprites.idle;
		}

		if (input[32]) { // space for jump
			if (isGrounded) {
				this.velocity.y = -300;
			}
		}

		if (input[90]) { // Zs
			this.sprite = this.sprites.fighting;
		}

		if (!isGrounded) {
			this.sprite = this.sprites.jumping;
		}
	}

	isGrounded() {
		if (!this.collisions) {
			return false;
		}
		return this.collisions.some((collision) => collision.yDir < 0);
	}
}
