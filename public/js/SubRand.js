// Code adapted from http://rosettacode.org/wiki/Subtractive_generator
export default class SubRand {
  constructor(seed = 0) {
    this.state = new Array(55);
    this.si = 0;
    this.sj = 0;
		this.mod = 10e9;
		
		this.seed(seed);
  }

  seed(p1) {
    let p2 = 1;

    this.state[0] = p1 % this.mod;

    for (let i = 1, j = 21; i < 55; i++, j += 21) {
      if (j >= 55) j -= 55;
      this.state[j] = p2;
      if ((p2 = p1 - p2) < 0) p2 += this.mod;
      p1 = this.state[j];
    }

    this.si = 0;
    this.sj = 24;
    for (let i = 0; i < 165; i++) this.next();
  }

  next() {
    let x = 0;

    if (!this.si--) this.si = 54;
    if (!this.sj--) this.sj = 54;
    if ((x = this.state[this.si] - this.state[this.sj]) < 0) x += this.mod;

    return (this.state[this.si] = x);
  }
}