import { arrayDifference, euclideanDistance, G } from "./math.js"

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

  getDistance(otherBody) {
    return euclideanDistance(this.position, otherBody.position)
  }

  calculateGravitationalForceVector(otherBody) {
    const distance = this.getDistance(otherBody)

    const magnitude = (G * this.mass * otherBody.mass) / (distance * distance)
    const positionDifference = arrayDifference(
      otherBody.position,
      this.position,
    )
    return positionDifference.map((delta) => magnitude * (delta / distance))
  }

  calculateNetForceVector(otherBodies) {
    return otherBodies
      .map((otherBody) => this.calculateGravitationalForceVector(otherBody))
      .reduce((acc, curr) => acc.map((e, index) => e + curr[index]))
  }

  updatePosition(otherBodies, dt) {
    const netForceVector = this.calculateNetForceVector(otherBodies)
    const accelerationVector = netForceVector.map((force) => force / this.mass)
    const newSpeed = this.speed.map(
      (v, index) => v + accelerationVector[index] * dt,
    )
    const newPosition = this.position.map(
      (x, index) => x + dt * newSpeed[index],
    )
    return new Body(this.radius, this.mass, newPosition, newSpeed)
  }
}
