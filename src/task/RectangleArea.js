import { Task } from './Task.js'

export class RectangleArea extends Task {
  /*
    https://regex-generator.olafneumann.org/?sampleText=3%2C4&flags=&selection=0%7CDigit,2%7CDigit,1%7CCharacter
    https://regexr.com
  */
  static validateSyntax (data) {
    const expression = /^\d+,\d+$/
    return expression.test(data)
  }

  /*
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#fixed-width_number_conversion
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    https://stackoverflow.com/questions/19843652/32-bit-signed-integer-math-in-javascript
  */
  process () {
    const [side1, side2] = this.data.split(',')
    let area = side1 * side2
    area = area > 2147483647 ? -2147483648 : area // overflow
    return area
  }
}
