const connection = require("../app/database")

class MomentService {
  async create(moment) {
    const statement = `INSERT INTO moment (content,user_id ) VALUES (?,?)`
    const [result] = await connection.execute(statement, [moment.content, moment.id])
    return result
  }

  async getMomentList(offset = 0, size = 10) {
    const statement = `SELECT * FROM moment LIMIT ?, ?`
    const [result] = await connection.execute(statement, [String(offset), String(size)])
    return result
  }
}

module.exports = new MomentService()