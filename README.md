## 前端运行

```bash
npm run start
```

## 内置功能
src                       
├─ app                    配置文件
│  ├─ database.js         数据库配置
│  └─ index.js            入口配置koa
├─ config                 启动配置文件
│  ├─ error.js            错误字符串常量抽取
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
└─ main.js                启动入口

config                 
├─ error-constants.js  
└─ server.js           
