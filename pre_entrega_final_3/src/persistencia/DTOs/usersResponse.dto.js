export default class UserssResponse {
  constructor(user) {
    this.id = user?.id || user?._id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
   // this.password = user.password;
    this.role = user.role || "user";
    this.isAdmin = user.isAdmin || false;
    this.cartId = user.cartId || null;
  }
}
