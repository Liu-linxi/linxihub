const connection = require("../app/database")

class MomentService {
  async create(moment) {
    const statement = `INSERT INTO moment (content,user_id ) VALUES (?,?)`
    const [result] = await connection.execute(statement, [moment.content, moment.id])
    return result
  }

  async getMomentList(offset = 0, size = 10) {
    // const statement = `SELECT * FROM moment LIMIT ?, ?`
    const statement = `SELECT 
        m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      LIMIT ? , ?;
    `
    const [result] = await connection.execute(statement, [String(offset), String(size)])
    return result
  }
  async getMomentById(id) {
    const statement = `SELECT 
        m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      WHERE m.id = ?;
    `
    const [result] = await connection.execute(statement, [id])
    return result
  }
}

module.exports = new MomentService()