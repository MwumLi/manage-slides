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

## 定制管理页

### 简单

默认管理页是内置的, 可以配置管理页面标题  

在 `package.json` 中的 `manage-slides` 字段中配置:  

``` json
{
  "manage-slides": {
    "appName": "Hero", // title => Hero's slides
    "title": "My Slides", // 这个字段优先级比 appName 更高, title => My Slides
  }
}
```

### window._APP

`package.json` 中的 `manage-slides` 字段会注入到管理页的全局变量 `window.__APP`  
同时, 这个全局变量会有一个  `manifests` 字段, 包含了当前你的 slide 列表:  

``` javascript
window._APP = {
  appName: 'Hero', // 网站标题前缀, 形成的网站标题为 "Hero's slide"
  title: 'Lady Gaga', // 完整网站标题, 比 appName 优先级更高, 即当他存在的时候, 就只是用 title 作为网站标题
  manifests: [ // 你的 slide 列表, 默认是 title/desc 都是 slide 目录名, 可以在 slide 目录下添加 manifest.json 文件来自定义  
    {
      title: 'slide 标题',
      href: 'a 标签的超链接',
      desc: '描述信息'
    }
  ]
}
```

### 高级

如果你想更深层次的定制, 可以在你 slide 项目下建立管理页 `main/`:  

``` bash
# 建立存放管理页的目录
my-slide $ mkdir main && cd main
# 创建你管理页: 在这里可以写你的页面结构
main $ touch index.html
# 创建管理页的交互: 在这里面写页面的主逻辑, 可以利用 window._APP 中的信息去定制列表
main $ touch index.js
```