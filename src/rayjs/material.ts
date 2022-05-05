import { Color } from "./color";
import { Vector2 } from "./vector2";
import { Vector3 } from "./vector3";

interface FragmentArgs {
  normal: Vector3;
  data: any; // uniforms-like data
  uv: Vector2;
}

export interface Material {
  fragment(args: FragmentArgs): Color;
}

export class ColorMaterial implements Material {
  color: Color;

  constructor(r, g, b) {
    this.color = new Color(r, g, b);
  }

  fragment(): Color {
    return this.color;
  }
}

export class NormalMaterial implements Material {
  fragment(args: FragmentArgs): Color {
    const { normal } = args;
    return new Color(normal.x, normal.y, normal.z);
  }
}

export class VertexMaterial implements Material {
  fragment(args: FragmentArgs): Color {
    return new Color(0, 0, 0);
  }
}

export class UVMaterial implements Material {
  fragment(args: FragmentArgs): Color {
    const { uv } = args;
    return new Color(uv.x, uv.y, 0);
  }
}
