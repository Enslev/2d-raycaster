interface ICasterOpts {
	drawLines: boolean;
	fill: boolean;
}

const DEFAULT_CASTER_OPTIONS: ICasterOpts = {
	drawLines: false,
	fill: true,
};


interface Obstacle {
	getCorners: () => Array<p5.Vector>;
	getBoundaries: () => Array<Boundary>;
	show: () => void;
}
