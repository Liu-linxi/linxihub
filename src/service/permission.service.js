const connection = require("../app/database")

class PermissionService {
  async findResouce(resouceName, resouceId) {
    const statement = `SELECT * FROM ${resouceName} WHERE id = ?`;
    const [result] = await connection.execute(statement, [resouceId]);
    return !!result.length;
  }

  async checkResouce(resouceName, resouceId, userId) {
    const statement = `SELECT * FROM ${resouceName} WHERE id = ? AND user_id = ?`;
    const [result] = await connection.execute(statement, [resouceId, userId]);
    return !!result.length;
  }
}

module.exports = new PermissionService()