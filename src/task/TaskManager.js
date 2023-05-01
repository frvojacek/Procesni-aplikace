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
  static #processed = []

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

  static process () {
    if (this.#queue.length === 0) {
      console.error('NO TASK IN QUEUE')
      return
    }
    const object = this.#queue[0]
    object.result = object.process()
    console.info(object.result)
    this.#queue.shift()
    this.#processed.push(object)
  }
}
