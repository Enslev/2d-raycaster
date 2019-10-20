var Boundary = (function () {
    function Boundary(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }
    Boundary.prototype.show = function () {
        stroke(255);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    };
    return Boundary;
}());
var Caster = (function () {
    function Caster(rays, x, y) {
        if (rays === void 0) { rays = 100; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.pos = createVector(x, y);
        this.rays = rays;
    }
    Caster.prototype.setPos = function (x, y) {
        this.pos = createVector(x, y);
    };
    Caster.prototype.full = function () {
        for (var r = 0; r < 2 * PI; r += PI / (this.rays / 2)) {
            var ray = new Ray(this.pos.x, this.pos.y, r);
            var intersec = ray.cast();
            if (intersec) {
                stroke(255, 100);
                line(this.pos.x, this.pos.y, intersec.x, intersec.y);
            }
        }
    };
    return Caster;
}());
var Ray = (function () {
    function Ray(x, y, dir) {
        this.pos = createVector(x, y);
        this.dir = dir;
    }
    Ray.prototype.cast = function () {
        var _this = this;
        var intersection = walls
            .map(function (wall) { return _this.castHelper(wall); })
            .filter(function (x) { return x; })
            .reduce(function (acc, cur) {
            if (!acc) {
                return cur;
            }
            if (cur.t < acc.t) {
                return cur;
            }
            return acc;
        }, undefined);
        return intersection ? intersection.point : undefined;
    };
    Ray.prototype.castHelper = function (wall) {
        var x1 = this.pos.x;
        var y1 = this.pos.y;
        var x2 = x1 + Math.cos(this.dir);
        var y2 = y1 + Math.sin(this.dir);
        var x3 = wall.a.x;
        var y3 = wall.a.y;
        var x4 = wall.b.x;
        var y4 = wall.b.y;
        var det = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (det === 0) {
            return;
        }
        var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / det;
        var u = -(((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / det);
        if (t >= 0 && u >= 0 && u <= 1) {
            return {
                t: t,
                u: u,
                point: createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1)),
            };
        }
        return;
    };
    return Ray;
}());
var walls = [];
var caster;
var locked = false;
function setup() {
    createCanvas(500, 500);
    caster = new Caster(500);
    walls.push(new Boundary(-1, -1, 501, -1));
    walls.push(new Boundary(501, -1, 501, 501));
    walls.push(new Boundary(501, 501, -1, 501));
    walls.push(new Boundary(-1, 501, -1, -1));
    walls.push(new Boundary(250, 200, 100, 450));
    walls.push(new Boundary(250, 200, 300, 200));
    walls.push(new Boundary(350, 100, 450, 400));
}
function mousePressed() {
    locked = !locked;
}
function draw() {
    background(0);
    walls.forEach(function (wall) { return wall.show(); });
    if (!locked) {
        caster.setPos(mouseX, mouseY);
    }
    caster.full();
}
//# sourceMappingURL=build.js.map