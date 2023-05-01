import { Task } from './Task.js'

export class RectanglePerimeter extends Task {
  process () {
    const [side1, side2] = this.data.split(',')
    return 2 * side1 + 2 * side2
  }
}
