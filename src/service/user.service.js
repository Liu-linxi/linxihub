const connection = require("../app/database");


class USerService {
  create(user) {
    // connection.execute('insert into user (name) values (?)', [user.name]);
    console.log("保存对象User到数据库中...")
  }
}

module.exports = new USerService();