import { Vector3 } from "./vector3";

export class Color {
  r: number;
  g: number;
  b: number;
  a = 1.0;

  constructor(r, g, b, a = 1.0) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = 1.0;
  }
}

interface FragmentArgs {
  normal: Vector3;
  data: any; // uniforms-like data
}

export interface Material {
  fragment(args: FragmentArgs): Color;
}

export class ColorMaterial implements Material {
  color: Color;

  constructor(r, g, b) {
    this.color = new Color(r, g, b);
  }

  fragment(args): Color {
    return this.color;
  }
}

export class Material {
  color = new Color(0, 0, 0);
}
