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
        JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url,'createTime',u.createAt,'updateTime',u.updateAt) user,
        (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount
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
        JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url,'createTime',u.createAt,'updateTime',u.updateAt) user,
        (
          SELECT
            JSON_ARRAYAGG(JSON_OBJECT(
              'id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAt,'updateTime',c.updateAt,
              'user',JSON_OBJECT('id',cu.id,'name',cu.name,'avatarUrl',cu.avatar_url)
            ))
          FROM comment c 
          LEFT JOIN user cu ON c.user_id = cu.id
          WHERE c.moment_id = m.id
        ) comments,
        (
          JSON_ARRAYAGG(JSON_OBJECT(
            'id', l.id, 'name', l.name
          ))
        ) labels
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id

      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON ml.label_id = l.id
      WHERE m.id = ?
      GROUP BY m.id
    `
    const [result] = await connection.execute(statement, [id])
    return result
  }
  async update(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [content, momentId])
    return result
  }
  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
  // 查询是否已经存在label_id和moment_id的关系
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return !!result.length
  }
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result
  }
}

module.exports = new MomentService()