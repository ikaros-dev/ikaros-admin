# ikaros-web

[ikaros](https://github.com/li-guohao/ikaros) 项目的前端后台界面，已经编译进 [ikaros](https://github.com/li-guohao/ikaros) 对应的目录中。

基于[ant-design-vue-pro](https://github.com/vueComponent/ant-design-vue-pro) 和 [halo-admin](https://github.com/halo-dev/console)

# 问题追踪

请到 [ikaros](https://github.com/li-guohao/ikaros) 下进行提问: https://github.com/li-guohao/ikaros/issues 

# VSCode 插件

- Vetur: Vue2支持插件
- ESLint: 代码规范插件

# 环境和依赖

- node: v16.18.1 (LTS)
- yarn
- webpack
- eslint
- @vue/cli
- ant-design-vue@1.x

### node.js
版本推荐[Node v16.18.1 (LTS)](https://nodejs.org/en/blog/release/v16.18.1/)，
太高的版本，由于OpenSSSL进行了更改，会出现下面的错误：
``` shell
opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ]
```
安装`yarn`
``` shell
npm install -g yarn
```

相关链接：
- https://nodejs.org/en/blog/release/
- https://nodejs.org/en/blog/release/v16.18.1/

# 项目下载和运行

## 安装依赖

```shell
yarn install
```

## 开发模式运行

```shell
yarn run serve
```

## 编译项目

```shell
yarn run build
```

## Lints and fixes files

```shell
yarn run lint
```
