import {
  RESTITUTION_COEFFICIENT,
  arrayDifference,
  euclideanDistance,
  G,
} from "./math.js"

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

  isCollision(otherBody) {
    return this.getDistance(otherBody) <= this.radius + otherBody.radius
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

  calculateOneDimensionalSpeedAfterImpact(u1, u2, m) {
    return (
      (u1 * this.mass + u2 * m + m * RESTITUTION_COEFFICIENT * (u2 - u1)) /
      (m + this.mass)
    )
  }

  calculateCollisionSpeedVector(otherBody) {
    return [
      this.calculateOneDimensionalSpeedAfterImpact(
        this.speed[0],
        otherBody.speed[0],
        otherBody.mass,
      ),
      this.calculateOneDimensionalSpeedAfterImpact(
        this.speed[1],
        otherBody.speed[1],
        otherBody.mass,
      ),
    ]
  }

  calculateNetCollisionVector(otherBodies) {
    return otherBodies
      .filter(this.isCollision.bind(this))
      .map(this.calculateCollisionSpeedVector.bind(this))
      .reduce((acc, curr) => acc.map((e, index) => e + curr[index]), this.speed)
  }

  updatePosition(otherBodies, dt) {
    const netForceVector = this.calculateNetForceVector(otherBodies)
    const accelerationVector = netForceVector.map((force) => force / this.mass)
    const newSpeed = this.calculateNetCollisionVector(otherBodies).map(
      (v, index) => v + accelerationVector[index] * dt,
    )
    const newPosition = this.position.map(
      (x, index) => x + dt * newSpeed[index],
    )
    return new Body(this.radius, this.mass, newPosition, newSpeed)
  }
}
