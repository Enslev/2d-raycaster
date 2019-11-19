
let walls: Boundary[] = [];
let caster: Caster;
let locked: boolean = false;

function setup() {
    createCanvas(500, 500)

    caster = new Caster(10);

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
}

function draw() {
    background(0);

    walls.forEach(wall => wall.show());

    if (!locked) {
        caster.setPos(mouseX, mouseY);
    }

    caster.full();
}
