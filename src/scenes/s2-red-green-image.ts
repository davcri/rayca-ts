export function process(ctx: CanvasRenderingContext2D, imgData: ImageData) {
  const [w, h] = [imgData.width, imgData.height];

  for (let i = 0; i < imgData.data.length / 4; i += 1) {
    const x = (i % w) / w;
    const y = Math.ceil(i / h) / h;
    imgData.data[i * 4 + 0] = x * 255; // R
    imgData.data[i * 4 + 1] = y * 255; // G
    imgData.data[i * 4 + 2] = 0; // B
    imgData.data[i * 4 + 3] = 255; // A
  }
}
