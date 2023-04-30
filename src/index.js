// https://nodejs.org/api/esm.html#esm_enabling
import * as readline from 'node:readline/promises'

// https://nodejs.dev/en/learn/accept-input-from-the-command-line-in-nodejs/
// https://nodejs.org/api/readline.html#readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

while (true) {
  const command = (await rl.question('')).split(' ')

  console.log(command)

  rl.on('close', function () {
    console.log('Application closed')
    process.exit(0)
  })
}
