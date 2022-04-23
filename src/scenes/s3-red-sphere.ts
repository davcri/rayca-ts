import { ColorMaterial } from "../rayjs/material";
import { Sphere } from "../rayjs/sphere";
import { Vector3 } from "../rayjs/vector3";
import { Scene } from "../rayjs/scene";

export function process(ctx: CanvasRenderingContext2D, imgData: ImageData) {
  const sphere = new Sphere({
    position: new Vector3(0, 0, -1),
    radius: 0.2,
    material: new ColorMaterial(1, 0, 0),
  });

  const scene = new Scene({
    children: [sphere],
  });

  scene.render(imgData);
}
