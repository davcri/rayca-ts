import { Object3D } from "./object3d";
import { Sphere } from "./sphere";
import { Vector3 } from "./vector3";

interface IntersectionData {
  intersected: boolean;
  intersectionPoint: Vector3;
  normal: Vector3;
}

/**
 * [Ray-sphere intersection](https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-sphere-intersection)
 * @param sphere
 * @returns
 */
function intersectSphere(ray: Ray, sphere: Sphere): IntersectionData {
  const sphereCenter = new Vector3().copy(sphere.position);
  let l = sphereCenter.sub(ray.position);
  // angle between sphere-center-to-ray-origin and ray-direction
  let tca = l.dot(ray.dir);
  if (tca < 0.0) {
    return null;
  }

  let d2 = l.dot(l) - tca ** 2;
  if (d2 > sphere.radius ** 2) {
    return null;
  }

  let thc = Math.sqrt(sphere.radius ** 2 - d2);
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
    ray.dir.multiplyScalar(t0)
  );
  const normal = new Vector3(...sphere.position)
    .sub(intersectionPoint)
    .normalize();

  return {
    intersected: true,
    intersectionPoint,
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

      default:
        throw new Error(
          `Not implemented: intersects not implemented for ${object}`
        );
    }
  }
}

export { Ray };
