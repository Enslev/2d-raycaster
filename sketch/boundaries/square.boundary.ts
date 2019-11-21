class Square implements Obstacle {

	private corners: p5.Vector[];
	private fill: number;
	private boundaries: Boundary[];

	public constructor(x: number, y: number, diameter: number, fill: number = 200) {
		this.fill = fill;
		const r = diameter / 2;
		this.corners = [
			createVector(x + r, y + r),
			createVector(x - r, y + r),
			createVector(x - r, y - r),
			createVector(x + r, y - r),
		];
		this.boundaries = [];
		for (let i = 0; i < this.corners.length; i++) {
			const i2 = i < this.corners.length - 1 ? i + 1 : 0;
			this.boundaries.push(new Boundary(
				this.corners[i].x,
				this.corners[i].y,
				this.corners[i2].x,
				this.corners[i2].y,
			));
		}
	}

	public getCorners(): p5.Vector[] {
		return this.corners;
	}

	public getBoundaries(): Boundary[] {
		return this.boundaries;
	}

	public show() {
		stroke(255);
		fill(this.fill);
		beginShape();
		this.corners.forEach(corner => vertex(corner.x, corner.y));
		endShape(CLOSE);
	}
}
