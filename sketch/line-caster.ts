interface IHelperType {
	t: number;
	u: number;
	point: p5.Vector;
}

class LineCaster{
	public pos: p5.Vector;
	public raysAmount: number;
	private options: ICasterOpts;

	public constructor(raysAmount: number = 100, options: ICasterOpts) {
		this.pos = createVector(0, 0);
		this.raysAmount = raysAmount;
		this.options = Object.assign({}, DEFAULT_CASTER_OPTIONS, options);
	}

	public setPos(x: number, y: number) {
		this.pos = createVector(x, y);
	}

	public full() {
		fill(255, 100);
		beginShape();
		for (let r = 0; r < 2 * PI; r += PI / (this.raysAmount / 2)) {
			const ray = new LineCasterRay(this.pos.x, this.pos.y, r);
			const intersec = ray.cast();
			if (intersec) {
				vertex(intersec.x, intersec.y);
				if (this.options.drawLines) {
					stroke(255, 100);
					line(this.pos.x, this.pos.y, intersec.x, intersec.y);
				}
			}
		}
		noStroke();
		endShape(CLOSE);
	}
}

class LineCasterRay {
	public pos: p5.Vector;
	public dir: number;

	public constructor(x: number, y: number, dir: number) {
		this.pos = createVector(x, y);
		this.dir = dir;
	}

	// Return intersection point between THIS ray and all walls as vector.
	public cast(): p5.Vector {
		const intersection = this.castHelper(walls)
			.filter(x => x)
			.reduce((acc, cur) => {
				if (!acc) {
					return cur;
				}

				if (cur.t < acc.t) {
					return cur;
				}
				return acc;
			}, undefined);

		return intersection ? intersection.point : undefined;
	}

	// Return intersection point between THIS ray and given wall as vector.
	private castHelper(wall: Boundary[]): IHelperType[];
	private castHelper(wall: Boundary): IHelperType;
	private castHelper(wall: Boundary | Boundary[]): IHelperType | IHelperType[] {

		if (Array.isArray(wall)) {
			return wall.map(x => this.castHelper(x));
		}

		const x1 = this.pos.x;
		const y1 = this.pos.y;
		const x2 = x1 + Math.cos(this.dir);
		const y2 = y1 + Math.sin(this.dir);
		const x3 = wall.a.x;
		const y3 = wall.a.y;
		const x4 = wall.b.x;
		const y4 = wall.b.y;

		const det = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

		if (det === 0) {
			return;
		}

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / det;
		const u = -(((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / det);

		if (t >= 0 && u >= 0 && u <= 1) {
			return {
				t,
				u,
				point: createVector(
					x1 + t * (x2 - x1),
					y1 + t * (y2 - y1),
				),
			};
		}

		return;
	}
}
