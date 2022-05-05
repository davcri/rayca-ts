import { Color } from "./color";
import { Object3D } from "./object3d";
import { Sphere } from "./sphere";
import { Triangle } from "./triangle";
import { Vector2 } from "./vector2";
import { Vector3 } from "./vector3";

interface IntersectionData {
  intersectionPoint: Vector3;
  normal: Vector3;
  uv: Vector2;
  color: Color;
}

/**
 * [Ray-sphere intersection](https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-sphere-intersection)
 */
function intersectSphere(ray: Ray, sphere: Sphere): IntersectionData {
  const sphereCenter = new Vector3().copy(sphere.position);
  const l = sphereCenter.sub(ray.position);
  // angle between sphere-center-to-ray-origin and ray-direction
  const tca = l.dot(ray.dir);
  if (tca < 0.0) {
    return null;
  }

  const d2 = l.dot(l) - tca ** 2;
  if (d2 > sphere.radius ** 2) {
    return null;
  }

  const thc = Math.sqrt(sphere.radius ** 2 - d2);
  let t0 = tca - thc;
  let t1 = tca + thc;

  if (t0 > t1) {
    // swap mem
    t1 = t0;
  }

  if (t0 < 0.0) {
    t0 = t1;
    if (t0 < 0.0) {
      return null;
    }
  }

  const intersectionPoint = new Vector3(...ray.position).add(
    new Vector3(...ray.dir).multiplyScalar(t0)
  );

  const normal = intersectionPoint.sub(sphere.position).normalize();

  return {
    intersectionPoint,
    normal,
    uv: new Vector2(), // TODO: implement this
    color: new Color(0, 0, 0), // TODO: implement this
  };
}

/**
 * [Ray-triangle intersection](https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-rendering-a-triangle/ray-triangle-intersection-geometric-solution)
 */
function intersectTriangle(ray: Ray, triangle: Triangle): IntersectionData {
  const [v0, v1, v2] = triangle.getVertices();
  const v0v1 = new Vector3(v1.x - v0.x, v1.y - v0.y, v1.z - v0.z);
  const v0v2 = new Vector3(v2.x - v0.x, v2.y - v0.y, v2.z - v0.z);
  const normal = v0v1.cross(v0v2);
  const denom = normal.dot(normal);

  // Step 1: finding P
  const nDotRayDir: number = normal.dot(ray.dir);
  if (Math.abs(nDotRayDir) < Number.EPSILON) {
    return null; // they are parallel => no intersection
  }
  // compute d parameter using equation 2
  const d: number = -normal.dot(v0);
  // compute t (equation 3)
  const t: number = -(normal.dot(ray.position) + d) / nDotRayDir;
  // check if the triangle is in behind the ray
  if (t < 0) {
    // console.log("the triangle is behind");
    return null;
  }
  // compute the intersection point using equation 1
  const P = new Vector3(
    ray.position.x + ray.dir.x,
    ray.position.y + ray.dir.y,
    ray.position.z + ray.dir.z
  ).multiplyScalar(t);
  // Step 2: inside-outside test
  const edge0 = new Vector3(v1.x - v0.x, v1.y - v0.y, v1.z - v0.z);
  const vp0 = new Vector3(P.x - v0.x, P.y - v0.y, P.z - v0.z);
  let C: Vector3 = edge0.cross(vp0);
  if (normal.dot(C) < 0) return null; // P is on the right side

  // edge 1
  const edge1 = new Vector3(v2.x - v1.x, v2.y - v1.y, v2.z - v1.z);
  const vp1 = new Vector3(P.x - v1.x, P.y - v1.y, P.z - v1.z);
  C = edge1.cross(vp1);
  const u = normal.dot(C);
  if (u < 0) return null; // P is on the right side

  // edge 2
  const edge2: Vector3 = new Vector3(v0.x - v2.x, v0.y - v2.y, v0.z - v2.z);
  const vp2 = new Vector3(P.x - v2.x, P.y - v2.y, P.z - v2.z);
  C = edge2.cross(vp2);
  const v = normal.dot(C);
  if (v < 0) return null; // P is on the right side;

  const uv = new Vector2(u / denom, v / denom);

  // interpolated colors
  const c0 = triangle.v0.color.toLinear();
  const c1 = triangle.v1.color.toLinear();
  const c2 = triangle.v2.color.toLinear();
  let colorHex = 0;
  colorHex += Color.getHex(Color.multiply(c0, uv.x));
  colorHex += Color.getHex(Color.multiply(c1, uv.y));
  colorHex += (1.0 - uv.x - uv.y) * Color.getHex(c2);
  const color = new Color().setHex(colorHex).toRGB();

  return {
    intersectionPoint: P,
    normal,
    uv,
    color,
  };
}

class Ray extends Object3D {
  dir: Vector3;

  constructor({
    position = new Vector3(0, 0, 0),
    direction = new Vector3(1, 0, 0),
  } = {}) {
    super(position);
    this.dir = direction;
  }

  intersects(object): IntersectionData {
    switch (true) {
      case object instanceof Sphere:
        return intersectSphere(this, object);
      case object instanceof Triangle:
        return intersectTriangle(this, object);
      default:
        throw new Error(
          `Not implemented: intersects not implemented for ${object}`
        );
    }
  }
}

export { Ray };
