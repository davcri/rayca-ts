import { Material } from "./material";
import { Object3D } from "./object3d";
import { Vector3 } from "./vector3";

export class Triangle extends Object3D {
  v0: Vector3;
  v1: Vector3;
  v2: Vector3;
  material: Material;

  constructor({ position = new Vector3(), vertices = [] } = {}) {
    super(position);

    if (vertices.length > 0 && vertices.length !== 3) {
      throw new Error("Wrong number of vertices");
    }

    if (vertices.length === 0) {
      this.v0 = new Vector3(-1, 0, 0);
      this.v1 = new Vector3(1, 0, 0);
      this.v2 = new Vector3(0, 1, 0);
    } else {
      this.v0 = vertices[0];
      this.v1 = vertices[1];
      this.v2 = vertices[2];
    }
  }

  getVertices() {
    return {
      v0: new Vector3(...this.v0).add(this.position),
      v1: new Vector3(...this.v1).add(this.position),
      v2: new Vector3(...this.v2).add(this.position),
    };
  }
}
