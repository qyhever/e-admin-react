一个使用 react + antd + create-react-app 构建的 rbac 权限模型

#### 在线地址

- [github](https://qyhever.top/e-admin-react)
- [router history模式](https://qyhever.com/e-admin-react)



#### 运行项目

```shell
yarn start
```



#### 构建项目

```shell
yarn run build
```



[connected-react-router](https://github.com/supasate/connected-react-router)

一般我们都会使用`redux`来管理应用状态，使用`react-router`来操作路由。

但是这两个库不协调，所以需要另外的库来把这个库集成在一起。

安装`react-router-redux`后，可以通过`dispatch`的方式操作路由，把`react-router`自己维护的状态（`location、history等`）也交给`redux`管理

[react-router-reudx](https://github.com/reactjs/react-router-redux)已不再维护，`react-router4.x`版本以后推荐使用`connected-react-router`来保持`redux`与`redux`之间的同步