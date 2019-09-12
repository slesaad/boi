class Sprite {
	constructor(params) {
		this.params = params;
		const { width, height, fps = 12 } = this.params;

		const img = new Image();
		img.src = params.src;
		this.frameIndex = 0;

		this.time = 0;

		img.addEventListener('load', () => {
			this.img = img;
		})
	}

	draw(context, x, y, scaleX = 1, scaleY = 1) {
		if (this.img) {
			const {
				width,
				height,
				scale: imgScale = 1,
				totalFrames = 1,
				numFramesX = totalFrames
			} = this.params;

			context.save();
			context.translate(
				x + (scaleX < 0 ? width * imgScale * -scaleX: 0),
				y + (scaleY < 0 ? height * imgScale * -scaleY: 0)
			);
			context.scale(scaleX * imgScale, scaleY * imgScale);
			context.drawImage(
				this.img,
				width * (this.frameIndex % numFramesX),
				height * Math.floor(this.frameIndex / numFramesX),
				width, height,
				0, 0,
				width, height
			);
			context.restore();
		}
	}

	update(dt) {
		const { fps = 12, loop = true } = this.params;
		this.time += dt;
		const spf = (1 / fps);
		while (this.time > spf) {
			if (this.frameIndex < this.params.totalFrames - 1) {
				this.frameIndex++;
			} else {
				if (loop) {
					this.frameIndex = 0;
				}
			}
			this.time -= spf;
		}
	}
}
