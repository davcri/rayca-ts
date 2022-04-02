import { Ray } from "../rayjs/ray";
import { Vector3 } from "../rayjs/vector3";

export function process(ctx: CanvasRenderingContext2D, imgData: ImageData) {
  const [w, h] = [imgData.width, imgData.height];
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const p = j * w + i; // pixel index
      imgData.data[4 * p] = 0;
      imgData.data[4 * p + 1] = 0;
      imgData.data[4 * p + 2] = 0;
      imgData.data[4 * p + 3] = 255;
    }
  }
}
