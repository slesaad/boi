class Entity {
	constructor(components) {
		Object.keys(components).forEach((key) => {
			this[key] = components[key];
		});

		if (!this.pos) {
			this.pos = { x: 0, y: 0 };
		}
	}

	draw(context) {
		if (this.sprite) {
			this.sprite.draw(context, this.pos.x, this.pos.y, this.scaleX, this.scaleY);
		}
	}

	update(dt) {
		if (this.sprite) {
			this.sprite.update(dt);
		}
	}
}
