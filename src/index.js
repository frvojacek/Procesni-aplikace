// https://nodejs.org/api/esm.html#esm_enabling
import { User } from './authentication/User.js'
import * as readline from 'node:readline/promises'

/*
  https://nodejs.dev/en/learn/accept-input-from-the-command-line-in-nodejs/
  https://nodejs.org/api/readline.html#readline
*/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const user = new User()

/*
  https://nodejs.org/api/readline.html#rlquestionquery-options
  https://nodejs.org/api/readline.html#event-line
*/
rl.on('line', (input) => {
  let [token, command, ...args] = input.split(' ')
  listenCommand(token, command, ...args)
})

const commandsList = {
  'WHOAMI': {
    execute: () => user.whoami()
  },
  'LOGOUT': {
    execute: () => user.logout()
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
