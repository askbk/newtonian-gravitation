import { Body } from "./body.js"
import { World } from "./world.js"

const drawBackground = (context, width, height) => {
  context.fillStyle = "black"
  context.fillRect(0, 0, width, height)
}

const drawBody = (context, body) => {
  context.fillStyle = "white"
  context.beginPath()
  context.arc(...body.position, body.radius, 0, 2 * 3.14)
  context.fill()
}

const drawFunc = (width, height) => (context, bodies) => {
  drawBackground(context, width, height)
  bodies.forEach((body) => drawBody(context, body))
}

const play = (canvas, world) => {
  const context = canvas.getContext("2d")
  const { width, height } = canvas
  const draw = drawFunc(width, height)
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
    new Body(10, 1e17, [150, 150], [-160, 160]),
    new Body(50, 1e18, [450, 450], [0, 0]),
  ]),
)
