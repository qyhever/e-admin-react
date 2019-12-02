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

#### webpack添加 alias

`config/modules.js`文件中的`webpackAliases`的`alias`是解析项目根目录下的`tsconfig.json`或者`jsconfig.json`来返回的，不太适用

可以直接在`webpack.config.js`的`resolve.alias`字段中的末尾新增字段

```js
resolve: {
    // ...
    alias: {
        // ...
        '@': path.resolve(__dirname, '../src')
    }
}
```

#### 项目路径配置

包括项目入口文件、静态目录、项目构建输出目录、配置`proxy`文件...

在`config/paths.js`文件配置，挑出几个最常用的

```js
module.exports = {
  dotenv: resolveApp('.env'), // 项目环境变量文件
  appBuild: resolveApp('dist'), // 项目构建输出目录，默认 build
  appPublic: resolveApp('public'), // 静态目录
  appHtml: resolveApp('public/index.html'), // index.html
  appIndexJs: resolveModule(resolveApp, 'src/index'), // 项目入口文件
  proxySetup: resolveApp('src/setupProxy.js') // 配置 proxy 文件
}
```

#### 关闭自动开启浏览器配置

在`scripts/start.js`文件，注释掉`openBrowser(urls.localUrlForBrowser)`即可

#### 修改 webpack `output.publicPath`

直接在`package.json`中配置`homepage`字段

```json
{
    "homepage": "/e-admin/"
}
```

或者在命令行中使用`PUBLIC_URL`字段

```json
{
    "script": {
		"build": "cross-env PUBLIC_URL=/e-admin/ node scripts/build.js"
	}
}
```

#### eslint配置

可以直接在`package.json`中的`eslintConfig`字段配置。

`package.json`文件为`json`形式且为项目依赖包文件，`eslint`的配置可以单独新建配置文件。

在根目录下新建`.eslint.js`文件（或者`.eslintrc`），然后在命令行中需要设置`EXTEND_ESLINT`

```json
{
    "script": {
		"build": "cross-env EXTEND_ESLINT=true node scripts/build.js"
	}
}
```

