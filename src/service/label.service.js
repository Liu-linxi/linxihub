const connection = require("../app/database")

class LabelControllerService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  async getLabelList() {
    let statement = `SELECT * FROM label;`;
    const [result] = await connection.execute(statement);
    return result;
  }
}

module.exports = new LabelControllerService()