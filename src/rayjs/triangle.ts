import { Material } from "./material";
import { Object3D } from "./object3d";
import { Vector3 } from "./vector3";
import { Vertex } from "./vertex";

export class Triangle extends Object3D {
  v0: Vertex = new Vertex(0, 0, 0);
  v1: Vertex = new Vertex(0, 0, 0);
  v2: Vertex = new Vertex(0, 0, 0);
  material: Material;

  constructor({
    position = new Vector3(),
    vertices = [],
  }: {
    position: Vector3;
    vertices: Vertex[];
  }) {
    super(position);

    if (vertices.length > 0 && vertices.length !== 3) {
      throw new Error("Wrong number of vertices");
    }

    if (vertices.length === 0) {
      this.v0 = new Vertex(-1, 0, 0);
      this.v1 = new Vertex(1, 0, 0);
      this.v2 = new Vertex(0, 1, 0);
    } else {
      this.v0 = vertices[0];
      this.v1 = vertices[1];
      this.v2 = vertices[2];
    }
  }

  getVertices() {
    const v = [new Vector3(), new Vector3(), new Vector3()];
    Vector3.add(this.v0.pos, this.position, v[0]);
    Vector3.add(this.v1.pos, this.position, v[1]);
    Vector3.add(this.v2.pos, this.position, v[2]);
    return v;
  }
}
