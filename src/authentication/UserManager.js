import { CommandManager } from '../command/CommandManager.js'
import { User } from './User.js'
import { randomBytes } from 'node:crypto'

export class UserManager {
  static authenticate (email, ...args) {
    if (args.length !== 0) {
      console.error('SYNTAX ERROR')
      return
    }

    if (this.validateEmail(email, 'ssps.cz')) {
      const user = new User(email)
      const token = this.generateToken()
      process.env[token] = email
      console.info(token)
    } else {
      console.error('INVALID E-MAIL')
      return false
    }
  }

  static logout () {
    delete process.env[CommandManager.authorToken]
  }

  static whoami () {
    console.info(process.env[CommandManager.authorToken])
  }

  /*
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    https://web.archive.org/web/20221223174323/http://emailregex.com
  */
  static validateEmail (email, domain) {
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //eslint-disable-line
    let isValid = expression.test(email)

    if (!isValid) return false
    if (typeof domain !== 'undefined') {
      isValid = email.endsWith(`@${domain}`)
    }
    return isValid
  }

  /*
    https://metaschool.so/articles/nodejs-crypto-module/#3-generating-random-data
    https://nodejs.org/api/crypto.html#cryptorandombytessize-callback
    https://nodejs.dev/en/learn/how-to-read-environment-variables-from-nodejs
    https://nodejs.org/api/process.html#processenv
  */
  static generateToken () {
    const buffer = randomBytes(10)
    return buffer.toString('hex').toUpperCase()
  }
}
