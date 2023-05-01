import { Task } from './Task.js'

export class RectangleArea extends Task {
  process () {
    const [side1, side2] = this.data.split(',')
    return side1 * side2
  }
}
