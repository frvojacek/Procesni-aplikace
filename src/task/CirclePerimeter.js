import { Task } from './Task.js'

export class CirclePerimeter extends Task {
  process () {
    const radius = this.data
    const perimeter = 2 * Math.PI * radius
    return Math.ceil(perimeter)
  }
}
