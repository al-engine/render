# Al engine
## Render

This is module for Rendering image to canvas.

```typescript
  // this function will be called on each frame
  function update(params: UpdateParams) {
    // delta is a time passed from last frame
    params.delta;

    // setPixel for setting color for specific pixel
    params.pixels.setPixel(0, 1, 0xff0000);
  }

  // for creating a game you need a canvas and update function
  const game = createGame(canvasElement, update);
  game.start();
```  