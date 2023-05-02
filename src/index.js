// https://nodejs.org/api/esm.html#esm_enabling
import * as readline from 'node:readline'
import { CommandManager } from './command/CommandManager.js'
import { commandsList } from './command/commandsList.js'
import { User } from './authentication/User.js'

export const user = new User()

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
  const [token, ...commands] = input.split(' ')
  CommandManager.listenCommand(commandsList, token, ...commands)
})
