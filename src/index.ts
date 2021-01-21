import { OrgbValue, OrgbColor, Pixels, UpdateParams } from '@al-engine/core';

export default function createGame(
  canvas: HTMLCanvasElement,
  update: Update
): Game {
  const context = canvas.getContext('2d');
  if (!context) {
    throw Error('Wrong element, "canvas" expected');
  }

  let animationRequestId: number;
  let screen: Screen;
  let lastTime = Date.now();

  function init() {
    screen = new Screen(context!.createImageData(canvas.width, canvas.height));
  }

  function tick(): void {
    const currTime = Date.now();
    update({
      delta: currTime - lastTime,
      pixels: screen,
    });
    context!.putImageData(screen.imageData, 0, 0);
    lastTime = currTime;
    animationRequestId = requestAnimationFrame(tick);
  }

  return {
    stop: function() {
      cancelAnimationFrame(animationRequestId);
    },
    start: function() {
      init();
      tick();
    },
    reinit: function() {
      init();
    },
  };
}

export type Update = (params: UpdateParams) => void;

export interface Game {
  stop: () => void;
  start: () => void;
  reinit: () => void;
}

export class Screen implements Pixels {
  imageData: ImageData;
  constructor(imageData: ImageData) {
    this.imageData = imageData;
  }
  setPixel(x: number, y: number, color: OrgbValue) {
    const c = new OrgbColor(color);
    const index = this.getIndexFromPoint(x, y);
    this.imageData.data[index] = c.r;
    this.imageData.data[index + 1] = c.g;
    this.imageData.data[index + 2] = c.b;
    this.imageData.data[index + 3] = c.a;
  }
  getPixel(x: number, y: number) {
    const index = this.getIndexFromPoint(x, y);
    return OrgbColor.fromRgba(
      this.imageData.data[index],
      this.imageData.data[index + 1],
      this.imageData.data[index + 2],
      this.imageData.data[index + 3]
    ).value;
  }
  getIndexFromPoint(x: number, y: number) {
    if (!Number.isInteger(x) || x < 0 || !Number.isInteger(y) || y < 0) {
      throw new Error('Wrong parameter');
    }
    return (y * this.imageData.width + x) * 4;
  }
}
