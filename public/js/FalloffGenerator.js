export default class FalloffGenerator {
	static generateFalloffMap(size) {
		const map = (new Array(size)).fill(undefined).map(_ => new Array(size));

		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				const x = i / size * 2 - 1;
				const y = j / size * 2 - 1;

				const value = Math.max(Math.abs(x), Math.abs(y));

				map[i][j] = this.evaluate(value);
			}
		}

		return map;
	}

	static evaluate(x) {
		const a = 3;
		const b = 2.2;

		return x ** a / (x ** a + (b - b * x) ** a);
	}
}