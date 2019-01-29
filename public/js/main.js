import MapGenerator from './MapGenerator.js';
import Vector2 from './Vector2.js';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
// TODO: Maybe move this somwhere when I create canvas textures
canvas.width = 600;
canvas.height = 600;
document.querySelector('body').appendChild(canvas);

let scale_slider = document.createElement('input');
scale_slider.type = 'range';
scale_slider.min = 0;
scale_slider.max = 250;
scale_slider.step = 0.1;
scale_slider.value = 3;
document.querySelector('body').appendChild(scale_slider);

const mapGenerator = new MapGenerator(ctx);

function draw() {
	mapGenerator.offset = new Vector2(scale_slider.valueAsNumber, 0);
	mapGenerator.generateMap();
	requestAnimationFrame(draw);
}

draw();