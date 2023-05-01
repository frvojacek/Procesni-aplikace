import { RectangleArea } from './RectangleArea.js'
import { RectanglePerimeter } from './RectanglePerimeter.js'
import { CircleArea } from './CircleArea.js'
import { CirclePerimeter } from './CirclePerimeter.js'

// Methods are static, no need for multiple instances of a Manager
export class TaskManager {
  /*
    https://stackoverflow.com/questions/64436532/javascript-class-property-inside-vs-outside-constructor
    https://stackoverflow.com/questions/65550275/what-is-the-meaning-of-writing-a-field-outside-of-the-constructor-of-a-class
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
  */
  static #queue = []

  static status () {

  }

  static add (type, data) {
    let task
    switch (type) {
      case 'RECTANGLE-AREA':
        task = new RectangleArea(data)
        break
      case 'RECTANGLE-PERIMETER':
        task = new RectanglePerimeter(data)
        break
      case 'CIRCLE-AREA':
        task = new CircleArea(data)
        break
      case 'CIRCLE-PERIMETER':
        task = new CirclePerimeter(data)
        break
    }
    this.#queue.push(task)
    console.info(task.id)
  }

  process () {

  }
}
