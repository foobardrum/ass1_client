import dateTime from "../../../helpers/dateTime";
/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.username = null;
    this.birthdayDate = null;
    this.token = null;
    this.status = null;
    this.registrationDateTime = null;
    this.games = null;
    this.moves = null;
    Object.assign(this, data);
    this.registrationDateTime = dateTime.beautifyDateTime(data.registrationDateTime);
    this.birthdayDate = dateTime.beautifyDate(data.birthdayDate);

  }

  getFormattedUser() {
      let formattedUser = new User(this);
      formattedUser.registrationDateTime = dateTime.formatDateTime(formattedUser.registrationDateTime);
      formattedUser.birthdayDate = dateTime.formatDate(formattedUser.birthdayDate);
      return formattedUser;
  }
}
export default User;
