# manage-slides

集中管理 [reveal.js](https://revealjs.com/) 撰写的 ppt   
来吧, 别让你的 ppt 沉默了 !  

## 使用

### 初始化 slide 项目

``` bash
# 把一个目录 my-slide 初始化成一个 slide 项目
$ npx manage-slides init my-slide
# 展示目录结构
$ tree -L 1 my-slide
my-slide
├── node_modules
├── package-lock.json
├── package.json
└── slides

2 directories, 2 files
# 展示 demo 的目录结构
$ ls my-slide/slides/demo
index.html    index.js      manifest.json
```

* `slides` 里面的目录就是你写 slide 的地方, 里面默认有一个 `demo` 展示的就是 `reveal.js` 官网的 slide  

### 运行本地服务

运行本地服务, 实时查看改动效果:  

``` bash
my-slide $ npm run serve
 DONE  Compiled successfully in 1438ms                                                                                                           10:18:49 PM

 I  Project is running at http://localhost:8080/
```

### 构建静态站点

构建结果存放在 `dist/` 下, 可以直接在静态服务器下访问, 因此你可以使用 github/gitlab pages 部署  

``` bash
my-slide $ npm run build
```
