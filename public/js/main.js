import MapGenerator from './MapGenerator.js';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 300;
document.querySelector('body').appendChild(canvas);

let scale_slider = document.createElement('input');
scale_slider.type = 'range';
scale_slider.min = 0;
scale_slider.max = 250;
scale_slider.value = 3;
document.querySelector('body').appendChild(scale_slider);

const mapGenerator = new MapGenerator(ctx);
function draw() {
	mapGenerator.generateMap();
	requestAnimationFrame(draw);
}

draw();