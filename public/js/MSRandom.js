// Code adapted from .NET System.Random
// https://referencesource.microsoft.com/#mscorlib/system/random.cs,03bb9c8b76f56119

export default class MSRandom {
	constructor(seed = Date.now() % 2 ** 31 - 1) {
		// this._MBIG = this._MBIG;
		this._MBIG = 2 ** 31 - 1;
		this._MSEED = 161803398;
		this._MZ = 0;
		this.inext;
		this.inextp;
		this.seedArray = new Array(56);

		this.seed(seed);
	}

	seed(seed) {
		//Initialize our Seed array.
		//This algorithm comes from Numerical Recipes in C (2nd Ed.)
		let subtraction = (seed === this._MBIG) ? this._MBIG : Math.abs(seed);
		let mj = this._MSEED - subtraction;
		this.seedArray[55] = mj;
		let mk = 1;

		//Apparently the range [1..55] is special (Knuth) and so we're wasting the 0'th position.
		for (let i = 1; i < 55; i++) {
			let ii = (21 * i) % 55;
			this.seedArray[ii] = mk;
			mk = mj - mk;
			if (mk < 0) mk += this._MBIG;
			mj = this.seedArray[ii];
		}

		for (let k = 1; k < 5; k++) {
			for (let i = 1; i < 56; i++) {
				this.seedArray[i] -= this.seedArray[1 + (i + 30) % 55];
				if (this.seedArray[i] < 0) this.seedArray[i] += this._MBIG;
			}
		}

		this.inext = 0;
		this.inextp = 21;
		seed = 1;
	}

	sample() {
		//Including this division at the end gives us significantly improved
		//random number distribution.
		return this.internalSample() * 1 / this._MBIG;
	}

	getSampleForLargeRange() {
		// The distribution of double value returned by Sample 
		// is not distributed well enough for a large range.
		// If we use Sample for a range [Int32.MinValue..Int32.MaxValue)
		// We will end up getting even numbers only.

		let result = this.internalSample();
		// Note we can't use addition here. The distribution will be bad if we do that.
		// decide the sign based on second sample
		if (this.internalSample() % 2 === 0) result = -result;

		return (result + this._MBIG - 1) / (2 * this._MBIG - 1);
	}

	internalSample() {
		let locINext = this.inext;
		let locINextp = this.inextp;

		if (++locINext >= 56) locINext = 1;
		if (++locINextp >= 56) locINextp = 1;

		let retVal = this.seedArray[locINext] - this.seedArray[locINextp];

		if (retVal === this._MBIG) retVal--;
		if (retVal < 0) retVal += this._MBIG;

		this.seedArray[locINext] = retVal;

		this.inext = locINext;
		this.inextp = locINextp;

		return retVal;
	}

	next() {
		return this.internalSample();
	}

	nextRange(minValue, maxValue) {
		if (minValue > maxValue)
			throw new Error(`${minValue} must be less than or equal to ${maxValue}`);

		const range = maxValue - minValue;

		return range < this._MBIG
			? parseInt(this.sample() * range) + minValue
			: parseInt((this.getSampleForLargeRange() * range) + minValue);
	}
}