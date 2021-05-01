export class World {
  constructor(bodies) {
    this._bodies = bodies
  }

  get bodies() {
    return this._bodies
  }

  addBody(body) {
    return new World([...this.bodies, body])
  }

  update(dt) {
    const bodies = this.bodies.map((body) =>
      body.updatePosition(
        this.bodies.filter((b) => b != body),
        dt,
      ),
    )
    return new World(bodies)
  }
}
