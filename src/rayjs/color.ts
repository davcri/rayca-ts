export function SRGBToLinear(c) {
  return c < 0.04045
    ? c * 0.0773993808
    : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
}

export function LinearToSRGB(c) {
  return c < 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
}

export class Color {
  r: number;
  g: number;
  b: number;
  a = 1.0;

  constructor(r = 0, g = 0, b = 0, a = 1.0) {
    this.setRGB(r, g, b);
    this.a = a;
  }

  toLinear() {
    return new Color(
      SRGBToLinear(this.r),
      SRGBToLinear(this.g),
      SRGBToLinear(this.b)
    );
  }

  toRGB() {
    return new Color(
      LinearToSRGB(this.r),
      LinearToSRGB(this.g),
      LinearToSRGB(this.b)
    );
  }

  setHex(hex) {
    hex = Math.floor(hex);
    this.r = ((hex >> 16) & 255) / 255;
    this.g = ((hex >> 8) & 255) / 255;
    this.b = (hex & 255) / 255;
    return this;
  }

  setRGB(r, g, b) {
    console.assert(r <= 1, "Color: Red component is greater than 1");
    console.assert(g <= 1, "Color: Green component is greater than 1");
    console.assert(b <= 1, "Color: Blue component is greater than 1");
    // console.assert(a <= 1, "Color: Alpha component is greater than 1");
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  }

  static add(c1: Color, c2: Color) {
    return new Color(c1.r + c2.r, c1.g + c2.g, c1.b + c2.b, c1.a + c2.a);
  }

  static multiply(c1: Color, k: number) {
    return new Color(k * c1.r, k * c1.g, k * c1.b, c1.a);
  }

  static getHex(col) {
    return ((col.r * 255) << 16) ^ ((col.g * 255) << 8) ^ ((col.b * 255) << 0);
  }

  static fromHex(hex) {
    const r = ((hex >> 16) & 255) / 255;
    const g = ((hex >> 8) & 255) / 255;
    const b = (hex & 255) / 255;
    return new Color(r, g, b, 1);
  }
}
