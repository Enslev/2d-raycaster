class Caster {
	public pos: p5.Vector;
	public rays: number;

	public constructor(rays: number = 100, x: number = 0, y: number = 0) {
		this.pos = createVector(x, y);
		this.rays = rays;
	}

	public setPos(x: number, y: number) {
		this.pos = createVector(x, y);
	}

	public full() {
		for (let r = 0; r < 2 * PI; r += PI / (this.rays / 2)) {
			const ray = new Ray(this.pos.x, this.pos.y, r);
			const intersec = ray.cast();
			if (intersec) {
				stroke(255, 100);
				line(this.pos.x, this.pos.y, intersec.x, intersec.y);
			}
		}
	}
}
