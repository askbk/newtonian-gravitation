import { Body } from "./body.js"
import { World } from "./world.js"

const update = (bodies, dt) => {
  return bodies.map((body) => body.updatePosition(dt))
}

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

const play = (canvas, bodies) => {
  const context = canvas.getContext("2d")
  let _bodies = bodies
  let lastTime
  const callback = (millis) => {
    if (lastTime) {
      _bodies = update(_bodies, (millis - lastTime) / 1000)
      draw(context, _bodies)
    }
    lastTime = millis
    requestAnimationFrame(callback)
  }

  callback()
}

play(document.getElementById("world-canvas"), [
  new Body(50, 50, [100, 100], 10),
])
