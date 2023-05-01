// https://nodejs.org/api/esm.html#esm_enabling
import * as readline from 'node:readline'
import { User } from 'authentication/User.js'
import { TaskManager } from 'task/TaskManager.js'

const taskManager = new TaskManager()
const user = new User()

/*
  https://nodejs.dev/en/learn/accept-input-from-the-command-line-in-nodejs/
  https://nodejs.org/api/readline.html#readline
*/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

/*
  https://nodejs.org/api/readline.html#rlquestionquery-options
  https://nodejs.org/api/readline.html#event-line
*/
rl.on('line', (input) => {
  const [token, command, ...args] = input.split(' ')

  // token and command required
  if (typeof command === 'undefined') {
    console.error('SYNTAX ERROR')
    return
  }

  listenCommand(token, command, ...args)
})

const commandsList = {
  WHOAMI: {
    execute: () => user.whoami()
  },
  LOGOUT: {
    execute: () => user.logout()
  },
  STATUS: {
    execute: () => taskManager.status()
  },
  ADD: {
    execute: (type, data) => taskManager.add(type, data)
  },
  PROCESS: {
    execute: () => taskManager.process()
  }
}

function listenCommand (token, command, ...args) {
  if (token === 'AUTH') {
    user.authenticate(command, ...args)
    return
  }

  /*
    Too many arguments need to be handled separately
    https://levelup.gitconnected.com/how-to-write-function-with-n-number-of-parameters-in-javascript-a916de1be7a2
    https://stackoverflow.com/questions/13020532/amount-of-passed-parameters-to-functions-in-javascript
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    undefined command also outputs SYNTAX ERROR thanks to optional chaining operator
  */
  command = commandsList[command]
  if (command?.execute.length !== args.length) {
    console.error('SYNTAX ERROR')
    return
  }
  if (token !== process.env[user.email]) {
    console.error('UNAUTHENTICATED')
    return
  }

  command.execute()
}
