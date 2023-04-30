export class User {
  isAuthenticated = false

  authenticate () {
    this.isAuthenticated = true
  }
}
