import { Color, ColorMaterial, NormalMaterial } from "../rayjs/material";
import { Triangle } from "../rayjs/triangle";
import { Vector3 } from "../rayjs/vector3";
import { Scene } from "./scene";

export function process(ctx: CanvasRenderingContext2D, imgData: ImageData) {
  const triangle = new Triangle({
    position: new Vector3(0, 0, -0.3),
    vertices: [
      new Vector3(-0.2, -0.2, -0.6),
      new Vector3(0.2, -0.2, -0.6),
      new Vector3(0.0, 0.2, -0.6),
    ],
  });
  triangle.material = new ColorMaterial(1, 0, 0);
  // triangle.material = new NormalMaterial();

  const scene = new Scene({
    children: [triangle],
    backgroundColor: new Color(0, 0, 0, 0.1),
  });
  scene.render(imgData);
}
