import { TaskManager } from './TaskManager.js'

export class Task {
  static count = 0
  result

  constructor (data) {
    Task.count++
    this.id = Task.count
    this.data = data

    TaskManager.add(this)
  }
}
