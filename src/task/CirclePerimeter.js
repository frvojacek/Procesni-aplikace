import { Task } from './Task.js'

export class CirclePerimeter extends Task {
  // https://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits
  // https://regexper.com/#%5E%5Cd%2B%24
  static validateSyntax (data) {
    const expression = /^\d+$/
    return expression.test(data)
  }

  process () {
    const radius = this.data
    const perimeter = 2 * Math.PI * radius
    return Math.ceil(perimeter)
  }
}
