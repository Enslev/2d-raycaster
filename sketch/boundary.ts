
class Boundary {
	public a: p5.Vector;
	public b: p5.Vector;

	public constructor(x1: number, y1: number, x2: number, y2: number) {
		this.a = createVector(x1, y1);
		this.b = createVector(x2, y2);

	}

	public show() {
		stroke(255);
		line(this.a.x, this.a.y, this.b.x, this.b.y);
	}
}
