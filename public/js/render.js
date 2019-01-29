export function drawTexture(ctx, imageData) {
  const buffer = document.createElement('canvas');
  const bufferCtx = buffer.getContext('2d');
  buffer.width = imageData.width;
  buffer.height = imageData.height;
  bufferCtx.putImageData(imageData, 0, 0);

  const img = new Image();
	img.src = buffer.toDataURL();
	
	ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height
  );
}
