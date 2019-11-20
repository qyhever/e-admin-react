#### yarn安装依赖包报错

在项目目录下运行`yarn，`报错如下

```
yarn install v1.7.0
[1/4] Resolving packages...
[2/4] Fetching packages...
info There appears to be trouble with your network connection. Retrying...
error An unexpected error occurred: "https://registry.yarnpkg.com/@babel/highlight/-/highlight-7.0.0.tgz: connect ETIMEDOUT 104.16.21.35:443".
info If you think this is a bug, please open a bug report with the information provided in "F:\\await\\react-rabc\\yarn-error.log".
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
```



提示很明显，网络连接超时，我们更换一下源地址就行了

npm 设置为 淘宝源

```shell
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
```

yarn 设置为 淘宝源

```shell
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

项目中如果用的是 sass，需要下载 node-sass，这个依赖包下载是相当的慢，可以单独设置源地址

```shell
yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass
npm config set sass-binary-site http://npm.taobao.org/mirrors/node-sass
```

最后删除 node_modules，重新下载就行了

#### IE10下报错, Map 未定义

```
yarn add react-app-polyfill
```

入口文件第一行引入

```
// This must be the first line in src/index.js
import 'react-app-polyfill/ie9';
```

https://segmentfault.com/a/1190000017957529

