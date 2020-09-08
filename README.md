### e-admin-react
一个使用 react + antd + mobx + create-react-app 构建的 rbac 权限模型

- [在线预览](https://qyhever.top/e-admin-react)
- [在线预览(history模式)](https://qyhever.com/e-admin-react)
- [vue版本](https://github.com/qyhever/e-admin-vue/)
- [后端服务](https://github.com/qyhever/e-admin-server/)
- [create-react-app 常见配置](https://segmentfault.com/a/1190000023327242)

### npm 脚本
##### 安装依赖
```shell
yarn
```

##### 运行项目

```shell
yarn start
```

##### 构建项目

```shell
// 默认打包路由为 history 模式
yarn run build:alpha
yarn run build:prod
// 打包路由为 hash 模式
yarn run build:hash
```

##### 发布到 github-pages
```shell
yarn run deploy
```

#### 项目依赖

- antd `react`ui 库
- @ant-design/icons `antd`图标组件包
- mobx 状态管理
- mobx-react 在 `react` 中使用 `mobx`
- react-router-dom `react` 路由
- react-router-config 使用配置的方式写路由
- history 轻松管理浏览器历史记录
- react-router-breadcrumbs-hoc 面包屑
- axios `http`请求
- qs
- md5
- js-base64
- react-custom-scrollbars 自定义滚动条
- less
- less-loader
- babel-plugin-import `antd` 按需加载 `babel` 插件
- cross-env 设置环境变量
- @babel/plugin-proposal-decorators 装饰器插件
- @babel/plugin-proposal-optional-chaining 可选链操作符
- compression-webpack-plugin 生成 gzip 文件
- sass-resources-loader 注入全局变量，混入方法
- webpack-bundle-analyzer 可视化打包分析插件
- webpackbar 显示编译时间
- react-transition-group 过渡动画
- lodash js 工具库
- nprogress 进度条
- hoist-non-react-statics 复制静态方法
- classnames css多个类名组合
- react-helmet 修改页面title
- gh-pages github-pages 部署
