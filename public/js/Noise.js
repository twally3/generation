import PerlinNoise from './PerlinNoise.js';
import Random from './Random.js';
import Vector2 from './Vector2.js';
import { map } from './maths.js';
const perlinNoise = new PerlinNoise;

export default class Noise {
	static generateNoiseMap(mapWidth, mapHeight, seed, scale, octaves, persistance, lacunarity, offset) {
		const noiseMap = new Array(mapWidth).fill(undefined).map(_ => new Array(mapHeight));
		const prng = new Random(seed);
		const octaveOffsets = new Array(octaves);

		for (let i = 0; i < octaves; i++) {
			const offsetX = prng.nextRange(-100000, 100000) + offset.x;
			const offsetY = prng.nextRange(-100000, 100000) + offset.y;
			octaveOffsets[i] = new Vector2(offsetX, offsetY);
		}
		
		// To simulate unity scale * 10
		if (scale <= 0) scale = 0.0001;

		let maxNoiseHeight = Number.MIN_SAFE_INTEGER, minNoiseHeight = Number.MAX_SAFE_INTEGER;
		const halfWidth = mapWidth / 2;
		const halfHeight = mapHeight / 2;

		for (let y = 0; y < mapHeight; y++) {
			for (let x = 0; x < mapWidth; x++) {

				let amplitude = 1, frequency = 1, noiseHeight = 0;

				for (let i = 0; i < octaves; i++) {
					const sampleX = (x - halfWidth) / scale * frequency + octaveOffsets[i].x;
					const sampleY = (y - halfHeight) / scale * frequency + octaveOffsets[i].y;
	
					noiseHeight += perlinNoise.noise(sampleX, sampleY) * amplitude;

					amplitude *= persistance;
					frequency *= lacunarity;
				}

				if (noiseHeight > maxNoiseHeight) maxNoiseHeight = noiseHeight;
				if (noiseHeight < minNoiseHeight) minNoiseHeight = noiseHeight;

				noiseMap[x][y] = noiseHeight;
			}
		}

		for (let y = 0; y < mapHeight; y++) {
			for (let x = 0; x < mapWidth; x++) {
				// noiseMap[x][y] = inverseLerp(minNoiseHeight, maxNoiseHeight, noiseMap[x][y]);
				noiseMap[x][y] = map(noiseMap[x][y], minNoiseHeight, maxNoiseHeight, 0, 1);
			}
		}

		return noiseMap;
	}
}