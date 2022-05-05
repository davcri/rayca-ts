import { Color } from "./color";
import { VertexMaterial } from "./material";
import { Ray } from "./ray";
import { Vector3 } from "./vector3";

class Eye {
  position: Vector3;
  fov: number;
  angle: number;

  constructor() {
    this.position = new Vector3(0, 0, 0);
    this.fov = 40.0;
    this.angle = Math.tan(((Math.PI / 2) * this.fov) / 180.0);
  }
}

export class Scene {
  children: Object[];
  backgroundColor: Color;
  eye: Eye = new Eye();

  constructor({ children = [], backgroundColor = new Color(0, 0, 0) } = {}) {
    this.children = children;
    this.backgroundColor = backgroundColor;
  }

  render(imgData) {
    const [w, h] = [imgData.width, imgData.height];
    const inv_w = 1.0 / w;
    const inv_h = 1.0 / h;

    const { angle, position } = this.eye;
    const aspectRatio = w / h;

    let i = 0;

    const ray = new Ray({ position });
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let xx = (2.0 * ((x + 0.5) * inv_w) - 1.0) * angle * aspectRatio;
        let yy = (1.0 - 2.0 * ((y + 0.5) * inv_h)) * angle;
        ray.dir.set(xx, yy, -1.0);
        ray.dir = ray.dir.normalize();
        let col = this.backgroundColor;

        for (const obj of this.children) {
          // primary ray
          const intersectionData = ray.intersects(obj);
          if (intersectionData) {
            const { normal, uv, color } = intersectionData;
            const fragData = {
              normal,
              uv,
              data: {
                rayDir: ray.dir, // currently unused
              },
            };
            if (obj.material instanceof VertexMaterial) {
              col = color;
            } else {
              col = obj.material.fragment(fragData);
            }
          }
          // apply color
          imgData.data[i * 4 + 0] = Math.round(col.r * 255); // R
          imgData.data[i * 4 + 1] = Math.round(col.g * 255); // G
          imgData.data[i * 4 + 2] = Math.round(col.b * 255); // B
          imgData.data[i * 4 + 3] = Math.round(col.a * 255); // A
        }
        i++;
      }
    }
  }
}
