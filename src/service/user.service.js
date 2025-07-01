const connection = require("../app/database");


class USerService {
  async create(user) {
    const { name, password } = user;
    // 获取用户user
    const statement = 'INSERT INTO `user` (name,password) VALUES (?,?);';

    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }
}

module.exports = new USerService();