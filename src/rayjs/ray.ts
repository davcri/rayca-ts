import { Object3D } from "./object3d";
import { Sphere } from "./sphere";
import { Triangle } from "./triangle";
import { Vector3 } from "./vector3";

const EPSILON = 0.000000001;

interface IntersectionData {
  intersected: boolean;
  intersectionPoint: Vector3;
  normal: Vector3;
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
    intersected: true,
    intersectionPoint,
    normal,
  };
}

/**
 * [Ray-triangle intersection](https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-rendering-a-triangle/ray-triangle-intersection-geometric-solution)
 */
function intersectTriangle(ray: Ray, triangle: Triangle): IntersectionData {
  const v0 = new Vector3(...triangle.v0).add(triangle.position);
  const v1 = new Vector3(...triangle.v1).add(triangle.position);
  const v2 = new Vector3(...triangle.v2).add(triangle.position);

  const v0v1 = new Vector3(...v1).sub(v0);
  const v0v2 = new Vector3(...v2).sub(v0);
  const normal = v0v1.cross(v0v2);

  // Step 1: finding P
  // check if ray and plane are parallel ?
  const nDotRayDir: number = normal.dot(ray.dir);
  if (Math.abs(nDotRayDir) < EPSILON) {
    return null; // they are parallel so they don't intersect !
  }
  // compute d parameter using equation 2
  const d: number = -normal.dot(v0);
  // compute t (equation 3)
  const t: number = -(normal.dot(triangle.position) + d) / nDotRayDir;
  // check if the triangle is in behind the ray
  if (t < 0) {
    // console.log("the triangle is behind");
    return null;
  }
  // compute the intersection point using equation 1
  const P = new Vector3(...ray.position).add(
    new Vector3(...ray.dir).multiplyScalar(t)
  );

  // Step 2: inside-outside test
  let edge0 = new Vector3(...v1).sub(v0);
  let vp0 = new Vector3(...P).sub(v0);
  let C: Vector3 = edge0.cross(vp0);
  if (normal.dot(C) < 0) return null; // P is on the right side

  let edge1 = new Vector3(...v2).sub(v1);
  let vp1 = new Vector3(...P).sub(v1);
  C = edge1.cross(vp1);
  const u = normal.dot(C) < 0;
  if (u) return null; // P is on the right side

  // edge 2
  let edge2: Vector3 = new Vector3(...v0).sub(v2);
  let vp2 = new Vector3(...P).sub(v2);
  C = edge2.cross(vp2);
  const v = normal.dot(C);
  if (v < 0) return null; // P is on the right side;

  // return true; // this ray hits the triangle
  return {
    intersected: true,
    intersectionPoint: P,
    normal,
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
