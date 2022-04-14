import { Material } from "./material";
import { Object3D } from "./object3d";
import { Vector3 } from "./vector3";

export class Triangle extends Object3D {
  v0: Vector3 = new Vector3();
  v1: Vector3 = new Vector3();
  v2: Vector3 = new Vector3();
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
      this.v0.copy(vertices[0]);
      this.v1.copy(vertices[1]);
      this.v2.copy(vertices[2]);
    }
  }

  getVertices() {
    const v = [new Vector3(), new Vector3(), new Vector3()];
    Vector3.add(this.v0, this.position, v[0]);
    Vector3.add(this.v1, this.position, v[1]);
    Vector3.add(this.v2, this.position, v[2]);
    return v;
  }
}
