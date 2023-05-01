import { Task } from './Task.js'

export class RectanglePerimeter extends Task {
  // https://regex-generator.olafneumann.org/?sampleText=3%2C4&flags=&selection=0%7CDigit,2%7CDigit,1%7CCharacter
  // https://regexr.com
  static validateSyntax (data) {
    const expression = /^\d+,\d+$/
    return expression.test(data)
  }

  process () {
    const [side1, side2] = this.data.split(',')
    return 2 * side1 + 2 * side2
  }
}
