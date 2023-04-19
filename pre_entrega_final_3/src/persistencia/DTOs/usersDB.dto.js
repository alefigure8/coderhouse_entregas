export default class UsersDB {
  constructor(user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.age = user.age;
    this.email = user.email;
    this.password = user.password;
    this.cartId = user.cartId || null;
    this.role = user.role || 'User';
  }
}
