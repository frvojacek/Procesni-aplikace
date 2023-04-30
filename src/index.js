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
    console.log('Application closed')
    process.exit(0)
  })
}

function listenCommand (command) {
  switch (command[0]) {
    case 'AUTH':
      if (command.length === 2) {
        user.authenticate(command[1])
      } else {
        console.log('SYNTAX ERROR')
      }
      break
  }
}
