import { Color } from "../rayjs/material";
import { Ray } from "../rayjs/Ray";
import { Sphere } from "../rayjs/sphere";
import { Vector3 } from "../rayjs/vector3";

export function process(ctx: CanvasRenderingContext2D, imgData: ImageData) {
  const [w, h] = [imgData.width, imgData.height];
  const inv_w = 1.0 / w;
  const inv_h = 1.0 / h;
  let fov = 30.0;
  let aspectRatio = w / h;
  const angle = Math.tan(((Math.PI / 2) * fov) / 180.0);

  // scene objects
  const objects = [];
  const sphere = new Sphere({
    position: new Vector3(0, 0, -1),
    radius: 0.2,
  });
  sphere.material.color.r = 1;
  objects.push(sphere);

  // render
  let i = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let xx = (2.0 * ((x + 0.5) * inv_w) - 1.0) * angle * aspectRatio;
      let yy = (1.0 - 2.0 * ((y + 0.5) * inv_h)) * angle;
      const ray = new Ray({ position: new Vector3(0, 0, 0) });
      ray.dir.set(xx, yy, -1.0);
      ray.dir = ray.dir.normalize();
      let col = new Color(0, 0, 0, 0);

      for (const obj of objects) {
        // primary ray
        if (ray.intersects(obj)) {
          col = obj.material.color;
        }
        // apply color
        imgData.data[i * 4 + 0] = col.r * 255; // R
        imgData.data[i * 4 + 1] = col.g * 255; // G
        imgData.data[i * 4 + 2] = col.b * 255; // B
        imgData.data[i * 4 + 3] = col.a * 255; // A
      }
      i++;
    }
  }
}
