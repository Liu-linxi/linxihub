// error-types.js

const NAME_OR_PASSWORD_IS_REQUIRED = 'NAME_OR_PASSWORD_IS_REQUIRED';        // 用户名或者密码不能为空
const USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS';                          // 用户已存在
const USER_DOES_NOT_EXIST = 'USER_DOES_NOT_EXIST';                          // 用户不存在
const PASSWORD_IS_INCORRECT = 'PASSWORD_IS_INCORRECT';                      // 密码错误
const INVALID_TOKEN = 'INVALID_TOKEN';                                      // 无效的token
const INVALID_PASSWORD = 'INVALID_PASSWORD';                                // 用户名或者密码错误

module.exports = {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS,
  USER_DOES_NOT_EXIST,
  PASSWORD_IS_INCORRECT,
  INVALID_TOKEN,
  INVALID_PASSWORD
};
