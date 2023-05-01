import { user } from '../index.js'
import { TaskManager } from '../task/TaskManager.js'
import { RectangleArea } from '../task/RectangleArea.js'
import { RectanglePerimeter } from '../task/RectanglePerimeter.js'
import { CircleArea } from '../task/CircleArea.js'
import { CirclePerimeter } from '../task/CirclePerimeter.js'

export const commandsList = {
  WHOAMI: {
    execute: () => user.whoami()
  },
  LOGOUT: {
    execute: () => user.logout()
  },
  STATUS: {
    execute: () => TaskManager.status()
  },
  ADD: {
    'RECTANGLE-AREA': {
      execute: (data) => {
        if (!RectangleArea.validateSyntax(data)) {
          console.error('SYNTAX ERROR')
          return false
        }
        new RectangleArea(data)
      }
    },
    'RECTANGLE-PERIMETER': {
      execute: (data) => {
        if (!RectanglePerimeter.validateSyntax(data)) {
          console.error('SYNTAX ERROR')
          return false
        }
        new RectanglePerimeter(data)
      }
    },
    'CIRCLE-AREA': {
      execute: (data) => {
        if (!CircleArea.validateSyntax(data)) {
          console.error('SYNTAX ERROR')
          return false
        }
        new CircleArea(data)
      }
    },
    'CIRCLE-PERIMETER': {
      execute: (data) => {
        if (!CirclePerimeter.validateSyntax(data)) {
          console.error('SYNTAX ERROR')
          return false
        }
        new CirclePerimeter(data)
      }
    }
  },
  PROCESS: {
    execute: () => TaskManager.process()
  }
}
