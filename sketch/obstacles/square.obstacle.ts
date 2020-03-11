type SquareOptions = {
	centre: p5.Vector;
	size: p5.Vector;
	rot?: number;
	fill?: number;
	stroke?: number | false;
}

class Square implements Obstacle {

	public readonly centre: p5.Vector;
	private size: p5.Vector;
	private rot: number;
	private fill: number;
	private stroke: number | false;

	private readonly defaults: Partial<SquareOptions> = {
		rot: 0,
		fill: 150,
		stroke: false,
	}

	public constructor(options: SquareOptions) {
		this.size = options.size;
		this.centre = options.centre;
		this.rot = options.rot || this.defaults.rot;
		this.fill = options.fill || this.defaults.fill;
		this.stroke = options.stroke || this.defaults.stroke;
	}

	public distance(from: p5.Vector): number {
		const relx = from.x - this.centre.x;
		const rely = from.y - this.centre.y;


		const rotx = relx * cos(-this.rot) + rely * sin(-this.rot)
		const roty = relx * sin(-this.rot) - rely * cos(-this.rot)

		const dx = max(abs(rotx) - this.size.x / 2, 0);
		const dy = max(abs(roty) - this.size.y / 2, 0);



		const outsideDst = Math.sqrt(dx * dx + dy * dy);
		return outsideDst;
	}

	public show() {
		fill(this.fill);
		if (this.stroke === false) {
			noStroke()
		} else {
			stroke(this.stroke);
		}

		push()
		translate(this.centre.x, this.centre.y)
		rotate(-this.rot)

		const offsetX = this.size.x / 2;
		const offsetY = this.size.y / 2;

		beginShape()
		const corners: p5.Vector[] = [
			createVector(-offsetX, -offsetY),
			createVector(offsetX, -offsetY),
			createVector(offsetX, offsetY),
			createVector(-offsetX, offsetY),
		]
		corners.forEach(corner => vertex(corner.x, corner.y));
		endShape(CLOSE);

		pop()
	}
}
