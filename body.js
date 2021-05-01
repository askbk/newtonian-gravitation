export class Body {
  constructor(radius, mass, position, speed) {
    this._radius = radius
    this._mass = mass
    this._position = position
    this._speed = speed
  }

  get radius() {
    return this._radius
  }

  get mass() {
    return this._mass
  }

  get position() {
    return this._position
  }

  get speed() {
    return this._speed
  }

  updatePosition(dt) {
    const newPosition = this.position.map((x) => x + dt * this.speed)
    return new Body(this.radius, this.mass, newPosition, this.speed)
  }
}
