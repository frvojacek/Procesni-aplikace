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
})

const commandsList = {
  'WHOAMI': {
    execute: () => user.whoami()
  },
  'LOGOUT': {
    execute: () => user.logout()
  }
}