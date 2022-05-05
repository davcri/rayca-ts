import { UVMaterial } from "../rayjs/material";
import { Triangle } from "../rayjs/triangle";
import { Vector3 } from "../rayjs/vector3";
import { Scene } from "../rayjs/scene";
import { Vertex } from "../rayjs/vertex";
import { Color } from "../rayjs/color";

export default function (ctx: CanvasRenderingContext2D, imgData: ImageData) {
  const triangle = new Triangle({
    position: new Vector3(0, 0, -0.3),
    vertices: [
      new Vertex(-0.2, -0.2, -0.6),
      new Vertex(0.2, -0.2, -0.6),
      new Vertex(0.0, 0.2, -0.6),
    ],
  });
  triangle.material = new UVMaterial();

  const scene = new Scene({
    children: [triangle],
    backgroundColor: new Color(0, 0, 0, 0.1),
  });
  scene.render(imgData);
}
