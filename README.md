# ikaros-admin
[ikaros](https://github.com/li-guohao/ikaros) 项目的前端后台界面，已经编译进 [ikaros](https://github.com/li-guohao/ikaros) 对应的目录中。

基于[ant-design-vue-pro](https://github.com/vueComponent/ant-design-vue-pro)


# 环境和依赖
- node
- yarn
- webpack
- eslint
- @vue/cli
- ant-design-vue@1.x - Ant Design Of Vue 实现
- vue-cropper - 头像裁剪组件
- @antv/g2 - Alipay AntV 数据可视化图表
- Viser-vue - antv/g2 封装实现

> 请注意，我们强烈建议本项目使用 Yarn 包管理工具，这样可以与本项目演示站所加载完全相同的依赖版本 (yarn.lock) 。由于我们没有对依赖进行强制的版本控制，采用非 yarn 包管理进行引入时，可能由于 Pro 所依赖的库已经升级版本而引入了新版本所导致的问题。作者可能会由于时间问题无法及时排查而导致您采用本项目作为基项目而出现问题。

# 项目下载和运行

## 安装依赖
``` shell
yarn install
```

## 开发模式运行

``` shell
yarn run serve
```

## 编译项目
``` shell
yarn run build
```


## Lints and fixes files
`` shell
yarn run lint
```
