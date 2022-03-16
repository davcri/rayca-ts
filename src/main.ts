import { allScenes } from "./scenes/all-scenes";

const app: HTMLElement = document.getElementById("app");

const appState = {
  selectedScene: null,
};

function resize(newSize) {
  canvas.width = newSize.w;
  canvas.height = newSize.h;
}

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
const canvas: HTMLCanvasElement = document.createElement("canvas");
resize({ w: 256, h: 256 });
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
const imgData: ImageData = ctx.createImageData(canvas.width, canvas.height);

app.appendChild(canvas);

function selectScene(sceneName) {
  // console.log(select.value, "processed");
  allScenes[sceneName](ctx, imgData);
  ctx.putImageData(imgData, 0, 0);
}

const buttonsDiv = document.createElement("div");
buttonsDiv.classList.add("buttons");

let firstButton = null;
for (const scene in allScenes) {
  const btn = document.createElement("button");
  // option.value = scene;
  btn.innerText = scene;
  if (!appState.selectedScene) {
    appState.selectedScene = btn.innerText;
  }
  btn.addEventListener("click", () => {
    for (let el of buttonsDiv.children) {
      el.classList.remove("selected");
    }
    appState.selectedScene = btn.innerText;
    btn.classList.add("selected");
    selectScene(appState.selectedScene);
  });
  if (!firstButton) {
    firstButton = btn;
  }
  buttonsDiv.appendChild(btn);
}
app.appendChild(buttonsDiv);
firstButton.click();
// buttons.addEventListener("change", () => doProcess(select.value));
