const mysql = require('mysql2')
// 创建链接
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Linxiroot.123',
  database: 'database_linxihub',
  connectionLimit: 5
})

// 判断是否链接成功
pool.getConnection((err, connection) => {
  if (err) {
    console.log('获取链接失败~', err);
    return
  }
  // 获取connection，尝试和数据库建立链接
  connection.connect(err => {
    if (err) {
      console.log('和数据库链接交互失败~', err);
      return
    }
    console.log('链接数据库成功，可以执行操作');

  })
})

// 获取连接池中链接对象
const connection = pool.promise();

module.exports = connection;