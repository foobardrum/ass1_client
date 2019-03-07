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
  }
}
export default User;
