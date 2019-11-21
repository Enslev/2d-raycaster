
let walls: Boundary[] = [];
let caster: Caster;
let locked: boolean = false;
let obstacles: Obstacle[] = [];

type Caster = LineCaster | SmartCaster;

function setup() {
	createCanvas(500, 500);
	noCursor();

	obstacles.push(new Square(width / 2, height / 2, width - 1, 0));
	obstacles.push(new Square(150, 100, 80));
	obstacles.push(new Square(400, 300, 80));

	caster = new SmartCaster(obstacles, {
		drawLines: true,
		fill: false,
	});


	// caster = new LineCaster(10000, {
	// 	drawLines: false,
	// 	fill: true,
	// });

	// Bounderies of canvas
	walls.push(new Boundary(-1, -1, 501, -1));
	walls.push(new Boundary(501, -1, 501, 501));
	walls.push(new Boundary(501, 501, -1, 501));
	walls.push(new Boundary(-1, 501, -1, -1));

	walls.push(new Boundary(250, 200, 100, 450));
	walls.push(new Boundary(250, 200, 300, 200));
	walls.push(new Boundary(350, 100, 450, 400));
	walls.push(new Boundary(10, 10, 100, 150));


}

function mousePressed() {
	locked = !locked;
	if (locked) {
		frameRate(0);
		cursor(ARROW);
	} else {
		frameRate(30);
		noCursor();
	}
}

function draw() {
	background(0);

	obstacles.forEach(obst => obst.show());

	// walls.forEach(wall => wall.show());

	if (!locked) {
		caster.setPos(mouseX, mouseY);
	}

	caster.full();
	noStroke();
	fill(255);
	// circle(mouseX, mouseY, 10);
}
