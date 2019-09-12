const MaterialType = {
	STATIC: 0,
	DYNAMIC: 1,
};

const PIXELS_PER_METER = 32;


class Physics {
	constructor(params) {
		this.gravity = params.gravity * PIXELS_PER_METER;
	}

	update(dt) {
		this.updatePhysics(dt);
		this.updateCollision();
	}

	updateCollision() {
		const collidingPairs = [];

		entities.forEach((entity) => {
			entity.collisions = [];
		});

		for (let i = 0; i < entities.length; i++) {
			const firstEntity = entities[i];
			if (!firstEntity.material || !firstEntity.collider) {
				continue;
			}
			for (let j = i+1; j < entities.length; j++) {
				const secondEntity = entities[j];
				if (!secondEntity.material || !secondEntity.collider) {
					continue;
				}
				if (firstEntity.material.type === MaterialType.STATIC
					&& secondEntity.material.type === MaterialType.STATIC) {
					continue;
				}
				collidingPairs.push({ firstEntity, secondEntity });
			}
		}

		collidingPairs.forEach((pair) => {
			if (Physics.checkCollision(pair)) {
				Physics.resolve(pair);
			}
		});
	}

	updatePhysics(dt) {
		entities
			.filter((e) => e.material.type === MaterialType.DYNAMIC && !!e.velocity)
			.forEach((entity) => {
				entity.velocity.y += this.gravity * dt;

				entity.pos.x += entity.velocity.x * dt;
				entity.pos.y += entity.velocity.y * dt;
			});
	}

	static checkCollision(pair) {
		const { firstEntity, secondEntity } = pair;

		const min_x1 = firstEntity.pos.x;
		const min_y1 = firstEntity.pos.y;
		const max_x1 = min_x1 + firstEntity.collider.width;
		const max_y1 = min_y1 + firstEntity.collider.height;

		const min_x2 = secondEntity.pos.x;
		const min_y2 = secondEntity.pos.y;
		const max_x2 = min_x2 + secondEntity.collider.width;
		const max_y2 = min_y2 + secondEntity.collider.height;

		if (min_x1 > max_x2) {
			return false;
		}

		if (min_x2 > max_x1) {
			return false;
		}

		if (min_y1 > max_y2) {
			return false;
		}

		if (min_y2 > max_y1) {
			return false;
		}

		const dx1 = max_x1 - min_x2;
		const dx2 = max_x2 - min_x1;

		if (dx1 < dx2) {
			pair.xOverlap = dx1;
			pair.xDir = -1;
		}
		else {
			pair.xOverlap = dx2;
			pair.xDir = 1;
		}

		const dy1 = max_y1 - min_y2;
		const dy2 = max_y2 - min_y1;

		if (dy1 < dy2) {
			pair.yOverlap = dy1;
			pair.yDir = -1;
		}
		else {
			pair.yOverlap = dy2;
			pair.yDir = 1;
		}

		return true;
	}

	static resolve(pair) {
		const { firstEntity, secondEntity } = pair;

		firstEntity.collisions.push({
			otherEntity: secondEntity,
			xDir: (pair.xOverlap < pair.yOverlap) ? pair.xDir : 0,
			yDir: (pair.xOverlap >= pair.yOverlap) ? pair.yDir : 0,
		});

		secondEntity.collisions.push({
			otherEntity: secondEntity,
			xDir: (pair.xOverlap < pair.yOverlap) ? -pair.xDir : 0,
			yDir: (pair.xOverlap >= pair.yOverlap) ? -pair.yDir : 0,
		});

		if (firstEntity.material.type == MaterialType.STATIC) {
			if (pair.xOverlap < pair.yOverlap) {
				secondEntity.pos.x -= pair.xOverlap * pair.xDir;

				if (secondEntity.velocity) {
					secondEntity.velocity.x = 0;
				}
			}
			else {
				secondEntity.pos.y -= pair.yOverlap * pair.yDir;
				if (secondEntity.velocity) {
					secondEntity.velocity.y = 0;
				}
			}
		}

		else if (secondEntity.material.type == MaterialType.STATIC) {
			if (pair.xOverlap < pair.yOverlap) {
				firstEntity.pos.x += pair.xOverlap * pair.xDir;
				if (firstEntity.velocity) {
					firstEntity.velocity.x = 0;
				}
			}
			else {
				firstEntity.pos.y += pair.yOverlap * pair.yDir;
				if (firstEntity.velocity) {
					firstEntity.velocity.y = 0;
				}
			}
		}

		else {
			if (pair.xOverlap < pair.yOverlap) {
				firstEntity.pos.x += pair.xOverlap / 2 * pair.xDir;
				secondEntity.pos.x -= pair.xOverlap / 2 * pair.xDir;

				if (firstEntity.velocity) {
					firstEntity.velocity.x = 0;
				}
				if (secondEntity.velocity) {
					secondEntity.velocity.x = 0;
				}
			}
			else {
				firstEntity.pos.y += pair.yOverlap / 2 * pair.yDir;
				secondEntity.pos.y -= pair.yOverlap / 2 * pair.yDir;

				if (firstEntity.velocity) {
					firstEntity.velocity.y = 0;
				}
				if (secondEntity.velocity) {
					secondEntity.velocity.y = 0;
				}
			}
		}
	}
}
