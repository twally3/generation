import { map } from './maths.js';

export function drawNoiseMap(ctx, noiseMap) {
	const noiseMapWidth = noiseMap.length, noiseMapHeight = noiseMap[0].length;
	const imageData = ctx.createImageData(noiseMapWidth, noiseMapHeight);

	for (let y = 0; y < noiseMapHeight; y++) {
		for (let x = 0; x < noiseMapWidth; x++) {
			const linearCoord = (y * noiseMapWidth + x) * 4;
			const colour = map(noiseMap[x][y], -1, 1, 0, 255);
			imageData.data[linearCoord + 0] = colour;
			imageData.data[linearCoord + 1] = colour;
			imageData.data[linearCoord + 2] = colour;
			imageData.data[linearCoord + 3] = 255;
		}
	}

	ctx.putImageData(imageData, 0, 0);
}