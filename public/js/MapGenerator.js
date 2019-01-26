import Noise from './Noise.js';
import { drawTexture } from './render.js';
import Vector2 from './Vector2.js';
import TextureGenerator from './TextureGenerator.js';

export default class MapGenerator {
	constructor(ctx) {
		this.ctx = ctx;
		// TODO: Pull this shit out
		this.mapWidth = 300;
		this.mapHeight = 300;
		this.seed = 0;
		this.noiseScale = 60;
		this.octaves = 4;
		this.persistance = 0.5;
		this.lacunarity = 2;
		this.offset = new Vector2(0, 0);

		// Definitely load this from JSON
		this.regions = [
			new TerrainType('Water Deep', 0.3, { R: 66, G: 110, B: 202 }),
			new TerrainType('Water Shallow', 0.4, { R: 74, G: 113, B: 206 }),
			new TerrainType('Sand', 0.45, { R: 216, G: 218, B: 154 }),
			new TerrainType('Grass', 0.55, { R: 100, G: 158, B: 32 }),
			new TerrainType('Grass 2', 0.6, { R: 76, G: 116, B: 28 }),
			new TerrainType('Rock', 0.7, { R: 100, G: 80, B: 75 }),
			new TerrainType('Rock 2', 0.9, { R: 85, G: 70, B: 70 }),
			new TerrainType('Snow', 1, { R: 255, G: 255, B: 255 })
		];

		this.DrawMode = {
			noiseMap: Symbol('noiseMap'),
			colourMap: Symbol('colourMap'),
		};
		this.drawMode = this.DrawMode.colourMap;

		this.validate();
	}
	
	validate() {
		if (this.mapWidth < 1) this.mapWidth = 1;
		if (this.mapHeight < 1) this.mapHeight = 1;
		if (this.lacunarity < 1) this.lacunarity = 1;
		if (this.octaves < 0) this.octaves = 0;
	}
	generateMap() {
		const noiseMap = Noise.generateNoiseMap(this.mapWidth, this.mapHeight, this.seed, this.noiseScale, this.octaves, this.persistance, this.lacunarity, this.offset);

		const imageData = this.ctx.createImageData(this.mapWidth, this.mapHeight);
		for (let y = 0; y < this.mapHeight; y++) {
			for (let x = 0; x < this.mapWidth; x++) {
				const currentHeight = noiseMap[x][y];
				for (let i = 0; i < this.regions.length; i++) {
					if (currentHeight <= this.regions[i].height) {
						const linearCoord = (y * this.mapWidth + x) * 4;

						imageData.data[linearCoord + 0] = this.regions[i].colour.R;
						imageData.data[linearCoord + 1] = this.regions[i].colour.G;
						imageData.data[linearCoord + 2] = this.regions[i].colour.B;
						imageData.data[linearCoord + 3] = 255;

						break;
					}
				}
			}
		}

		if (this.drawMode === this.DrawMode.noiseMap) {
			// TODO: Maybe introduce a GetObjectOfType object to find classes (maybe even do singleton stuff)
			drawTexture(this.ctx, TextureGenerator.textureFromHeightMap(this.ctx, noiseMap));
		} else if (this.drawMode === this.DrawMode.colourMap) {
			drawTexture(this.ctx, imageData);
		}

	}
}

class TerrainType {
	constructor(name, height, colour) {
		this.name = name;
		this.height = height;
		this.colour = colour;
	}
}