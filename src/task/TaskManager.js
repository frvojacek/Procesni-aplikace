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
    console.info(`${this.#queue.length} / ${this.#processed.length} tasks to be processed / were processed from start.`)
  }

  static add (task) {
    this.#queue.push(task)
    console.info(task.id)
  }

  static process () {
    if (this.#queue.length === 0) {
      console.error('NO TASK IN QUEUE')
      return
    }
    const task = this.#queue[0]
    task.result = task.process()
    console.info(`TASK #${task.id} COMPLETED, RESULT: ${task.result}`)
    this.#queue.shift()
    this.#processed.push(task)
  }
}
