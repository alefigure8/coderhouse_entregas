export default class UserssResponseDTO {
  constructor(user) {
    this.id = user?.id || user?._id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
  }
}
