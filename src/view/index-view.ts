import { Scene } from "../rayjs/scene";
import { allScenes } from "../scenes/all-scenes";

interface ProfileData {
  start: number;
  end: number;
}

export class IndexView {
  appState = {
    selectedSceneName: null,
  };
  parent: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  imgData: ImageData;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
    this.canvas = document.querySelector("canvas");
    this.resize({ w: 256, h: 256 });
    this.ctx = this.canvas.getContext("2d");
    this.imgData = this.ctx.createImageData(
      this.canvas.width,
      this.canvas.height
    );
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    let firstButton = null;
    for (const scene in allScenes) {
      const btn = document.createElement("button");
      btn.innerText = scene;
      if (!this.appState.selectedSceneName) {
        this.appState.selectedSceneName = btn.innerText;
      }
      btn.addEventListener("click", () => {
        for (let el of buttonsDiv.children) {
          el.classList.remove("selected");
        }
        const currentScene = allScenes[this.appState.selectedSceneName];
        if (currentScene instanceof Scene) {
          currentScene.onUnmount();
        }
        this.appState.selectedSceneName = btn.innerText;
        btn.classList.add("selected");
        this.setupScene(this.appState.selectedSceneName);
      });
      if (!firstButton) {
        firstButton = btn;
      }
      buttonsDiv.appendChild(btn);
    }

    parent.appendChild(this.createProfileDiv(0));
    parent.appendChild(buttonsDiv);
    firstButton.click();
  }

  createProfileDiv(frameTime) {
    const div = document.createElement("div");
    div.classList.add("profile");
    div.innerHTML = `<p>Frame rendered in <span class="time"> ${frameTime}</span>ms</p>`;
    return div;
  }

  displayProfileData(profileData: ProfileData) {
    const renderTime = profileData.end - profileData.start;
    const span = this.parent.querySelector("span.time") as HTMLSpanElement;
    span.innerText = `${renderTime.toFixed(2)}`;
  }

  resize(newSize) {
    this.canvas.width = newSize.w;
    this.canvas.height = newSize.h;
  }

  setupScene(sceneName) {
    const scene = allScenes[sceneName];
    const profileData = {
      start: null,
      end: null,
    };
    profileData.start = performance.now();
    if (scene instanceof Function) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      scene(this.ctx, this.imgData);
      this.ctx.putImageData(this.imgData, 0, 0);
    } else if (scene instanceof Scene) {
      scene.onMount();
      scene.process(this.ctx, this.imgData);
    }
    profileData.end = performance.now();
    this.displayProfileData(profileData);
  }
}
