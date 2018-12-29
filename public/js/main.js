import MSRandom from './MSRandom.js';

let x = new MSRandom(0);

for (let i = 0; i < 10; i++) {
  // console.log(x.next());
  const p = document.createElement('p');
  p.innerText = x.next();
  document.getElementById('thing').appendChild(p);
}

console.log('----------------');

let y = new MSRandom(0);

for (let i = 0; i < 10; i++) {
  // console.log(x.next());
  const p = document.createElement('p');
  p.innerText = y.nextRange(-1000, 1000);
  document.getElementById('thing').appendChild(p);
}

console.log('----------------');

let z = new MSRandom(0);

for (let i = 0; i < 10; i++) {
  // console.log(x.next());
  const p = document.createElement('p');
  p.innerText = z.nextRange(-1, 2147483647);
  document.getElementById('thing').appendChild(p);
}