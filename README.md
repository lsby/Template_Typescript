# 个人用 typescript 模板

## 功能

可以开发:

- 服务器
- vue 前端
- react 前端

## 使用

### 首次打开

- npm i
- 配置 .env 中的环境变量

### 启动服务

用 vscode 打开.

- 开发服务器: F1 -> run task -> dev:service
- 开发前端(vue): F1 -> run task -> dev:vue
- 开发前端(react): F1 -> run task -> dev:react

开发前端时会自动打开服务器, 前端可以直接访问后端接口.

一个项目只能选择使用 vue 或 react 中的一个.

修改文件后会自动重新编译, 网页热重载没有.

## 其他事项

### 环境变量

若要增加环境变量.

- 在 .env 中增加.
- 在 lib/gerEnv 中增加.
- 使用以下语句获得环境变量:

```
var { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME, APP_PORT } = 获得环境变量()
```

### 接口

在 src/interface 里.

一个文件夹就是一个接口.

每个接口有两个文件:

- data.ts
- index.ts

分别是形式定义和接口实现.

接口被调用时会检查其入参和返回值是否和声明形式相符.

拥有完整的静态检查和动态检查.

文件夹的名字即是接口的路径, 使用 `/api/<文件夹名字>` 来调用接口, POST 协议.

接口内访问数据库的方法是`req.kysely`.

### 数据库

生成文件在 `tools/migrations`, 可增量更新, 文件名按字母序.

- 使用`npm run db:push`即可将 migrations 推送至数据库.
- 使用`npm run db:pull`即可通过数据库连接生成类型描述文件.
- 其他命令请查阅 package.json 文件及源码.

### 快捷方式

- start_xxx: 启动某个环境.
  - 会同步分支, 重安装依赖, 编译, 推送数据库修改, 生成类型文件, 使用 pm2 启动.
  - pm2 启动的名字在 package.json 里改.
- sync_to_xxx: 将 xxx 的分支内容合并到当前分支上, 慎重操作.
