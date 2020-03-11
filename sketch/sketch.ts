
const walls: Boundary[] = [];
const obstacles: Obstacle[] = [];

let dir: p5.Vector;
let points: p5.Vector[] = [];
let speedIndex = 0;
const speeds = [0.002]

function mousePressed() {
	speedIndex++;
	speedIndex = speedIndex % speeds.length;
}

function setup() {
	createCanvas(500, 500);
	// noCursor();
	frameRate(60)

	dir = p5.Vector.fromAngle(-PI / 4);


	obstacles.push(new Square({
		centre: createVector(200, 300),
		size: createVector(50, 100),
		rot: PI / 4,
	}))

	obstacles.push(new Square({
		centre: createVector(100, 100),
		size: createVector(50, 50),
		rot: PI / 10,
	}))

	obstacles.push(new Square({
		centre: createVector(400, 100),
		size: createVector(50, 50),
	}))

	obstacles.push(new Square({
		centre: createVector(80, 320),
		size: createVector(300, 50),
		rot: PI / 3
	}))

	obstacles.push(new Circle({
		centre: createVector(300, 400),
		diameter: 100,
	}))

	obstacles.push(new Circle({
		centre: createVector(380, 190),
		diameter: 70,
	}))
}

function draw() {
	background(0);
	stroke(255);
	strokeWeight(1);
	fill(255);
	dir = dir.rotate(speeds[speedIndex])

	obstacles.forEach(o => o.show());

	let currentPos = createVector(width / 2, height / 2);

	stroke(255, 50)
	line(currentPos.x, currentPos.y, currentPos.x + dir.x * 500, currentPos.y + dir.y * 500)

	let distance;

	do {
		distance = obstacles.reduce((acc, cur) => {
			const d = cur.distance(currentPos);
			return acc < d ? acc : d;
		}, Infinity)

		const newPos = createVector(currentPos.x + dir.x * distance, currentPos.y + dir.y * distance)

		stroke(255);
		line(currentPos.x, currentPos.y, newPos.x, newPos.y)

		fill(255, 100);
		circle(currentPos.x, currentPos.y, distance * 2);

		currentPos = newPos;

		if (currentPos.x > width ||
			currentPos.x < 0 ||
			currentPos.y > height ||
			currentPos.y < 0
		) {
			break
		}

	} while (distance > 0.1)

	if (distance < 0.5) {
		speedIndex = 0;
		points.push(currentPos);
	} else {
		speedIndex = speeds.length - 1;
	}

	fill(255);
	noStroke()
	points.forEach(p => circle(p.x, p.y, 4));
}
