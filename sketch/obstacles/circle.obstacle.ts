type CircleOptions = {
	centre: p5.Vector;
	diameter: number;
	fill?: number;
	stroke?: number | false;
}

class Circle implements Obstacle {

	public readonly centre: p5.Vector;
	private diameter: number;
	private fill: number;
	private stroke: number | false;

	private readonly defaults: Partial<CircleOptions> = {
		fill: 150,
		stroke: false,
	}

	public constructor(options: CircleOptions) {
		this.diameter = options.diameter;
		this.centre = options.centre;
		this.fill = options.fill || this.defaults.fill;
		this.stroke = options.stroke || this.defaults.stroke;
	}

	public distance(from: p5.Vector): number {
		const dstToCenter = from.dist(this.centre);
		return dstToCenter - this.diameter / 2;
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

		circle(0, 0, this.diameter)

		pop()
	}
}
