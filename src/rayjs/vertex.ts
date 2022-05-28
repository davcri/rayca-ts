import { Color } from "./color";
import { Vector3 } from "./vector3";

export class Vertex {
  pos: Vector3;
  color: Color;

  constructor(x, y, z, color = new Color(1, 0, 0)) {
    this.pos = new Vector3(x, y, z);
    this.color = color;
  }
}
