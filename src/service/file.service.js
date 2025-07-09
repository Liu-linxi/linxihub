const connection = require("../app/database")

class homeService {
  async create(filename, originalname, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename,originalname,mimetype,size,user_id) VALUES (?,?,?,?,?);`;
    const [result] = await connection.execute(statement, [filename, originalname, mimetype, size, userId]);
    return result;
  }
}

module.exports = new homeService()