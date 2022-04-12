import { ColorMaterial } from "../rayjs/material";
import { Triangle } from "../rayjs/triangle";
import { Vector3 } from "../rayjs/vector3";
import { Scene } from "./scene";

export function process(ctx: CanvasRenderingContext2D, imgData: ImageData) {
  const triangle = new Triangle({
    position: new Vector3(0, 0, 5),
    vertices: [
      new Vector3(-0.2, -0.2, 0),
      new Vector3(0.2, -0.2, 0),
      new Vector3(0.0, 0.2, 0),
    ],
  });
  triangle.material = new ColorMaterial(1, 0, 0);

  const scene = new Scene({
    children: [triangle],
  });
  scene.render(imgData);
}
