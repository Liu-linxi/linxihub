## 运行

```bash
npm run start
```
## 命令操作
```bash
#生成私钥private.key文件名字  4096位更安全
openssl genrsa -out private.key 4096
#生成公钥 public.key生成后名字  这里从私钥（private.key）直接生成公钥public.key
openssl rsa -in private.key -pubout -out public.key
```
## 内置功能
src                       
├─ app                    配置文件
│  ├─ database.js         数据库配置
│  └─ index.js            入口配置koa
├─ config                 启动配置文件
│  ├─ keys                公钥私钥文件
│  │  ├─ private.key      
│  │  └─ public.key       
│  ├─ error.js            错误字符串常量抽取
│  ├─ screct.js           配置入口常量文件
│  └─ server.js           
├─ controller             具体业务实现分割文件
│  └─ user.controller.js  
├─ middleware             复杂业务逻辑处理中间件文件
│  └─ user.middleware.js  
├─ router                 访问接口路由分割文件
│  └─ user.router.js      
├─ service                链接数据库服务操作文件
│  └─ user.service.js     
├─ utils                  统一错误封装处理
│  └─ handle-error.js     错误信息处理
│  └─ md5-password.js      mdg5加密方法文件
└─ main.js                启动入口