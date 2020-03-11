interface ICasterOpts {
	drawLines: boolean;
	fill: boolean;
}

const DEFAULT_CASTER_OPTIONS: ICasterOpts = {
	drawLines: false,
	fill: true,
};


interface Obstacle {
	readonly centre: p5.Vector;

	distance: (from: p5.Vector) => number;

	show: () => void;
}
