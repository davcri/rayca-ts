import { Vector3 } from "./vector3";

export class Object3D {
  position: Vector3;

  constructor(position = new Vector3()) {
    this.position = position;
  }
}
