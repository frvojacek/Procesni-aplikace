import { UserManager } from '../authentication/UserManager.js'

// Methods are static, no need for multiple instances of a Manager
export class CommandManager {
  static authorToken

  static listenCommand (commandsList, token, ...commands) {
    // token and command required
    if (commands.length === 0) {
      console.error('SYNTAX ERROR')
      return false
    }
    if (token === 'AUTH') {
      UserManager.authenticate(...commands)
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
        if (typeof process.env[token] === 'undefined') {
          console.error('UNAUTHENTICATED')
          return false
        }
        // Successfull completion
        // https://stackoverflow.com/questions/6473858/how-do-i-get-the-last-5-elements-excluding-the-first-element-from-an-array
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

        this.authorToken = token
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
