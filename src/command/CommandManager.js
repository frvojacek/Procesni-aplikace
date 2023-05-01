import { user } from '../index.js'

// Methods are static, no need for multiple instances of a Manager
export class CommandManager {
  static listenCommand (commandsList, token, ...commands) {
    // token and command required
    if (commands.length === 0) {
      console.error('SYNTAX ERROR')
      return false
    }
    if (token === 'AUTH') {
      user.authenticate(...commands)
      return true
    }

    let commandInList = commandsList

    for (let count = 0; count < commands.length; count++) {
      const command = commands[count]

      // Existence check
      if (typeof commandInList[command] === 'undefined') {
        console.error('SYNTAX ERROR')
        return false
      }

      // Subcommand existence check
      if (typeof commandInList[command].execute !== 'undefined') {
        // Command argument amount check
        if (commandInList[command].execute.length !== commands.length - 1 - count) {
          console.error('SYNTAX ERROR')
          return false
        }
        // Authentication check
        if (token !== process.env[user.email]) {
          console.error('UNAUTHENTICATED')
          return false
        }
        // Successfull completion
        // https://stackoverflow.com/questions/6473858/how-do-i-get-the-last-5-elements-excluding-the-first-element-from-an-array
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
        commandInList[command].execute(...commands.slice(count - commands.length + 1)) // Argument is remaining
        return true
      }

      // Subcommand exists, run again for subcommand
      commandInList = commandInList[command]
    }

    // No subcommand specified
    console.error('SYNTAX ERROR')
    return false
  }
}
