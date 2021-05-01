export class World {
  constructor(bodies) {
    this._bodies = bodies
  }

  get bodies() {
    return this._bodies
  }

  update(dt) {
    const bodies = this.bodies.map((body) => body.updatePosition(dt))
    return new World(bodies)
  }
}
