const app = require("../app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS,
  USER_DOES_NOT_EXIST,
  PASSWORD_IS_INCORRECT,
  INVALID_TOKEN,
  INVALID_PASSWORD,
  OPERATION_NOT_ALLOWED,
  RESOURCE_NOT_FOUND
} = require("../config/error");

app.on("error", (err, ctx) => {
  let code = 0;
  let message = "服务器异常";

  switch (err) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001;
      message = "用户名或者密码不能为空";
      break;
    case USER_ALREADY_EXISTS:
      code = -1002;
      message = "用户已存在";
      break;
    case USER_DOES_NOT_EXIST:
      code = -1003;
      message = "用户不存在";
      break;
    case PASSWORD_IS_INCORRECT:
      code = -1004;
      message = "密码错误";
      break;
    case INVALID_TOKEN:
      code = -1005;
      message = "无效的token";
      break;
    case INVALID_PASSWORD:
      code = -1006;
      message = "用户名或者密码错误";
      break;
    case OPERATION_NOT_ALLOWED:
      code = -2001;
      message = "没有操作权限";
      break;
    case RESOURCE_NOT_FOUND:
      code = -2002;
      message = "数据资源不存在";
      break;
  }

  ctx.body = { code, message };
});
