import { Task } from './Task.js'

export class CirclePerimeter extends Task {
  /*
    https://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits
    https://regexper.com/#%5E%5Cd%2B%24
  */
  static validateSyntax (data) {
    const expression = /^\d+$/
    return expression.test(data)
  }

  /*
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#fixed-width_number_conversion
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    https://stackoverflow.com/questions/19843652/32-bit-signed-integer-math-in-javascript
  */
  process () {
    const radius = this.data
    let perimeter = 2 * 3.14 * radius
    perimeter = perimeter > 2147483647 ? -2147483648 : perimeter // overflow
    return Math.ceil(perimeter)
  }
}
