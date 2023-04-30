const { randomBytes } = await import('node:crypto')

export class User {
  // https://programiz.com/javascript/getter-setter
  status = {
    isAuthenticated: false,
    get checkAuthentication () {
      if (!this.isAuthenticated) {
        console.error('UNAUTHENTICATED')
      }
      return this.isAuthenticated
    }
  }

  authenticate (command) {
    if (command.length !== 2) {
      console.error('SYNTAX ERROR')
      return
    }
    if (this.status.isAuthenticated) {
      console.error('ALREADY AUTHENTICATED')
      return
    }

    this.email = command[1]

    if (this.validateEmail(this.email, 'ssps.cz')) {
      this.generateToken()
      this.status.isAuthenticated = true
    } else {
      console.error('INVALID E-MAIL')
    }
  }

  logout () {
    if (this.status.checkAuthentication) {
      delete process.env[this.email]
      this.status.isAuthenticated = false
    }
  }

  whoami () {
    if (this.status.checkAuthentication) {
      console.info(this.email)
    }
  }

  /*
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    https://web.archive.org/web/20221223174323/http://emailregex.com
  */
  validateEmail (email, domain) {
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
  generateToken () {
    randomBytes(10, (error, buffer) => {
      if (error) console.error(error)
      const token = buffer.toString('hex')
      process.env[this.email] = token
      console.info(token)
    })
  }
}
