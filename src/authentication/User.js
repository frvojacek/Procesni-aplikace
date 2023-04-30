export class User {
  isAuthenticated = false

  authenticate (email) {
    if (this.validateEmail(email, 'ssps.cz')) {
      this.isAuthenticated = true
    } else {
      console.log('INVALID EMAIL')
    }
  }

  validateEmail (email, domain) {
    /*
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
      https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
      https://web.archive.org/web/20221223174323/http://emailregex.com/
    */
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //eslint-disable-line
    let isValid = expression.test(email)

    if (!isValid) return false
    if (typeof domain !== 'undefined') {
      isValid = email.endsWith(`@${domain}`)
    }

    return isValid
  }
}
