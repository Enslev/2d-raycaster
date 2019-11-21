interface ISmartHelperType {
	t: number;
	u: number;
	point: p5.Vector;
}


class SmartCaster {
	private pos: p5.Vector;
	private obsts: Obstacle[];
	private options: ICasterOpts;

	public constructor(obsts: Obstacle[], options: Partial<ICasterOpts>) {
		this.pos = createVector(height / 2, width / 2);
		this.obsts = obsts;
		this.options = Object.assign({}, DEFAULT_CASTER_OPTIONS, options);
	}

	public setPos(x: number, y: number) {
		this.pos = createVector(x, y);
	}

	public full() {

		let intersect: p5.Vector[] = [];

		this.obsts.forEach(obst => {
			const corners = obst.getCorners();
			corners.forEach(corner => {
				stroke(255, 255);

				let r = createVector(1, 0).angleBetween(p5.Vector.sub(corner, this.pos));
				r = this.pos.y < corner.y ? r : 2 * PI - r;

				const ray = new SmartCasterRay(this.pos.x, this.pos.y, r);

				//Create offset lines
				const dirVector = ray.getDirVector();
				dirVector.rotate(PI / 2);

				const rayOsP = new SmartCasterRay(this.pos.x + dirVector.x, this.pos.y + dirVector.y, r);
				const rayOsN = new SmartCasterRay(this.pos.x - dirVector.x, this.pos.y - dirVector.y, r);

				let intersectDirect = ray.cast(this.obsts);
				let intersectOsP = rayOsP.cast(this.obsts);
				let intersectOsN = rayOsN.cast(this.obsts);

				if (intersectDirect) {
					intersect.push(intersectDirect.point);
					stroke(255, 0, 0, 100);
					line(this.pos.x, this.pos.y, intersectDirect.point.x, intersectDirect.point.y);
				}
				if (intersectOsP) {
					intersect.push(intersectOsP.point);
					stroke(0, 255, 0, 100);
					line(this.pos.x + dirVector.x, this.pos.y + dirVector.y, intersectOsP.point.x, intersectOsP.point.y);
				}
				if (intersectOsN) {
					intersect.push(intersectOsN.point);
					stroke(0, 0, 255, 100);
					line(this.pos.x - dirVector.x, this.pos.y - dirVector.y, intersectOsN.point.x, intersectOsN.point.y);
				}
			});
		});

		const hor = createVector(1, 0);



		intersect.sort((a, b) => {
			const aDirectionVector = p5.Vector.sub(a, this.pos);
			const aDirectionAngle = this.pos.y < a.y ? hor.angleBetween(aDirectionVector) : 2 * PI - hor.angleBetween(aDirectionVector);

			const bDirectionVector = p5.Vector.sub(b, this.pos);
			const bDirectionAngle = this.pos.y < b.y ? hor.angleBetween(bDirectionVector) : 2 * PI - hor.angleBetween(bDirectionVector);

			return aDirectionAngle - bDirectionAngle;
		});


		fill(255, 100);
		noStroke();
		beginShape();
		intersect.forEach(v => vertex(v.x, v.y));
		endShape(CLOSE);

	}

}

class SmartCasterRay {
	private pos: p5.Vector;
	private dir: p5.Vector;

	public constructor(x: number, y: number, dir: number) {
		this.pos = createVector(x, y);
		this.dir = createVector(cos(dir), sin(dir));
	}

	public getDirVector(): p5.Vector {
		return this.dir.copy().setMag(0.9);
	}

	// Return intersection point between THIS ray and all walls as vector.
	public cast(obsts: Obstacle[]): ISmartHelperType {
		return this.castHelper(obsts)
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

	}

	// Return intersection point between THIS ray and given wall as vector.
	private castHelper(obst: Obstacle[]): ISmartHelperType[];
	private castHelper(obst: Obstacle): ISmartHelperType[];
	private castHelper(obst: Obstacle | Obstacle[]): ISmartHelperType[] {

		if (Array.isArray(obst)) {
			return obst
				.map(x => this.castHelper(x))
				.reduce((acc, cur) => acc.concat(cur), []);
		}

		return obst.getBoundaries().map(bound => {
			return this.intersect(bound);
		});

	}

	private intersect(line: Boundary) {
		const x1 = this.pos.x;
		const y1 = this.pos.y;
		const x2 = x1 + this.dir.x;
		const y2 = y1 + this.dir.y;
		const x3 = line.a.x;
		const y3 = line.a.y;
		const x4 = line.b.x;
		const y4 = line.b.y;

		const det = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

		if (det === 0) {
			return;
		}

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / det;
		const u = -(((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / det);

		if (t >= 0 && u >= -0.01 && u <= 1.01) {
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
