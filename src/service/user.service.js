const connection = require("../app/database");


class UserService {
  async create(user) {
    const { name, password } = user;
    // 获取用户user
    const statement = 'INSERT INTO `user` (name,password) VALUES (?,?);';

    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }
  async getUserByName(name) {
    const statement = 'SELECT * FROM `user` WHERE name = ?;';
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
}

module.exports = new UserService();