import { process as redGreenImage } from "./s2-red-green-image";
import { process as blackImage } from "./s1-black-image";
import { process as redSphere } from "./s3-red-sphere";
import { process as sphereNormal } from "./s4-normal-sphere";
import { process as triangle } from "./s5-triangle";
import triangleUv from "./s6-triangle-uv";
import triangleVertex from "./s7-triangle-vertex-color";

export const allScenes = {
  triangleVertex,
  triangleUv,
  triangle,
  sphereNormal,
  redSphere,
  redGreenImage,
  blackImage,
};
