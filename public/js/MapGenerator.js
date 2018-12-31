import Noise from './Noise.js';
import { drawNoiseMap } from './render.js';
import Vector2 from './Vector2.js';

export default class MapGenerator {
	constructor(ctx) {
		this.ctx = ctx;
		this.mapWidth = 300;
		this.mapHeight = 300;
		this.seed = 0;
		this.noiseScale = 30;
		this.octaves = 4;
		this.persistance = 0.5;
		this.lacunarity = 2;
		this.offset = new Vector2(0, 0);
	}

	generateMap() {
		const noiseMap = Noise.generateNoiseMap(this.mapWidth, this.mapHeight, this.seed, this.noiseScale, this.octaves, this.persistance, this.lacunarity, this.offset);

		// TODO: Maybe introduce a GetObjectOfType object to find classes (maybe even do singleton stuff)
		drawNoiseMap(this.ctx, noiseMap);
	}
}