import { Body } from "./body.js"
import { World } from "./world.js"

const drawBackground = (context) => {
  context.fillStyle = "black"
  context.fillRect(0, 0, 900, 400)
}

const drawBody = (context, body) => {
  context.fillStyle = "white"
  context.beginPath()
  context.arc(...body.position, body.radius, 0, 2 * 3.14)
  context.fill()
}

const draw = (context, bodies) => {
  drawBackground(context)
  bodies.forEach((body) => drawBody(context, body))
}

const play = (canvas, world) => {
  const context = canvas.getContext("2d")
  let _world = world
  let lastTime
  const callback = (millis) => {
    if (lastTime) {
      _world = _world.update((millis - lastTime) / 1000)
      draw(context, _world.bodies)
    }
    lastTime = millis
    requestAnimationFrame(callback)
  }

  callback()
}

play(
  document.getElementById("world-canvas"),
  new World([
    new Body(50, 50, [100, 100], 0),
    new Body(100, 50, [600, 200], 0),
  ]),
)
