const app = document.getElementById("app");

const w = 256;
const h = 256;

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
const canvas = document.createElement("canvas");
app.appendChild(canvas);
canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext("2d");
const imgData = ctx.createImageData(w, h);

for (let i = 0; i < imgData.data.length / 4; i += 1) {
  const x = i % w;
  const y = Math.ceil(i / h);
  imgData.data[i * 4 + 0] = x; // R
  imgData.data[i * 4 + 1] = y; // G
  imgData.data[i * 4 + 2] = 0; // B
  imgData.data[i * 4 + 3] = 255; // A
}

ctx.putImageData(imgData, 0, 0);
