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

export class Material {
  color = new Color(0, 0, 0);
}
