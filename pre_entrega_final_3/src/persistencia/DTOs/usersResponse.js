export default class UserssResponseDTO {
    constructor(user) {
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.email = user.email;
      this.password = user.password;
    }
  }
  