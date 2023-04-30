// https://nodejs.org/api/esm.html#esm_enabling
import { User } from './authentication/User.js'
import * as readline from 'node:readline/promises'

// https://nodejs.dev/en/learn/accept-input-from-the-command-line-in-nodejs/
// https://nodejs.org/api/readline.html#readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const user = new User()

while (true) {
  const command = (await rl.question('')).split(' ')

  listenCommand(command)

  rl.on('close', function () {
    console.info('Closing application')
    delete process.env[user.email]
    process.exit(0)
  })
}

function listenCommand (command) {
  switch (command[0]) {
    case 'AUTH':
      user.authenticate(command)
      break
    case process.env[user.email]:
      switch (command[1]) {
        case 'WHOAMI':
          user.whoami()
          break
        case 'LOGOUT':
          user.logout()
          break
        default:
          console.error('SYNTAX ERROR')
      }
      break
    default:
      console.error('SYNTAX ERROR')
  }
}
