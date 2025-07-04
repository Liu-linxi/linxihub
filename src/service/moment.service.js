const connection = require("../app/database")

class MomentService {
  async create(moment) {
    const statement = `INSERT INTO moment (content,user_id ) VALUES (?,?)`
    const [result] = await connection.execute(statement, [moment.content, moment.id])
    return result
  }
}

module.exports = new MomentService()