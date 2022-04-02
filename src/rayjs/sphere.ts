import { Vector3 } from "./vector3";
import { Object3D } from "./object3d";
import { Material } from "./material";

export class Sphere extends Object3D {
  radius: number;
  material: Material;

  constructor({ position = new Vector3(), radius = 1.0 } = {}) {
    super(position);
    this.radius = radius;
    this.material = new Material();
  }
}
