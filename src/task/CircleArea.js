import { Task } from './Task.js'

export class CircleArea extends Task {
  process () {
    const radius = this.data
    const area = Math.PI * Math.pow(radius, 2)
    return Math.ceil(area)
  }
}
