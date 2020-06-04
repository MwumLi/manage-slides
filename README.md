# manage-slides

打造属于你的 slides hub, 集中管理你的 slides  
来吧, 别让你的 ppt 沉默了 !  

## 使用

### 初始化 slide 项目

初始化一个目录为 manage-slides 项目:  

``` bash
# 把一个目录 my-slide 初始化成一个 slide 项目
$ npx manage-slides init my-slide
```

ok, `my-slide/` 现在就是你的 hub 了  
现在按照下面 **运行本地服务** 章节的操作去查看效果吧!  

### 运行本地服务

运行本地服务, 实时查看改动效果:  

``` bash
my-slide $ npm run serve
 DONE  Compiled successfully in 1438ms                                                                                                           10:18:49 PM

 I  Project is running at http://localhost:8080/
```

当新增, 编辑 slides 的时候, 会实时编译, 然后在浏览器上看到真实效果  

### 构建静态站点

你可以需要部署起来, 方便查看, 不用担心, 我们可以轻松做到  

执行下面命令构建静态站点:  

``` bash
my-slide $ npm run build
```  

构建结果存放在 `dist/` 下, 可以直接拿去部署  

如果你想本地预览:  

``` bash
$ cd dist && npx http-server
```

如果你没有合适的服务器, 你可以利用 Github Pages/ Gitlab Pages 服务进行部署  
推荐指数五星, 理由如下:  

* 代码托管和版本管理, 又同事做静态服务器  
* 还可以利用 ci 去实现提交即部署  

### 如何新增 slide

我把 slide 分为两种:  

1. 常规 slide: slide 代码直接在我们创建的 slide hub 中, 目前默认仅支持优秀的 [reveals.js](https://github.com/hakimel/reveal.js)  
2. 轻量级 slide: 只有一个 `manifest.json` 存储了 slide 信息, 常用于链接外部的 slide 到 slide hub  

通过两种 slide 完全可以把你所有 slide 在一个 hub 中管理  

#### 新增常规 slide

添加一个常规 slide(具备基本的 html/js):  

``` bash
my-slide $ npx manage-slides add normal
templates/slide/index.html.mustache -> /Users/luo/WorkSpace/gitopen/free/reveal-ppt/abc/slides/normal/index.html
templates/slide/index.js.mustache -> /Users/luo/WorkSpace/gitopen/free/reveal-ppt/abc/slides/normal/index.js
templates/slide/manifest.json.mustache -> /Users/luo/WorkSpace/gitopen/free/reveal-ppt/abc/slides/normal/manifest.json

my-slide $ ls slides/normal
index.html    index.js      manifest.json
```

#### 新增轻量级 slide

添加一个轻量级 slide:  

``` bash
my-slide $ npx manage-slides -l light
my-slide $ ls slides/light
manifest.json
```

你可以在 `manifest.json` 中修改 slide 信息  

## 定制首页

默认情况下, 会有一个默认的首页, 但并没有对外暴露  

### 配置标题

目前仅仅提供了标题的配置  

在 `package.json` 中的 `manage-slides` 字段中配置:  

``` json
{
  "manage-slides": {
    "appName": "Hero", // title => Hero's slides
    "title": "My Slides", // 这个字段优先级比 appName 更高, title => My Slides
  }
}
```

### 定制

如果你想更深层次的定制, 你也仅仅需要两步:  

1. 抽离定制页到当前 hub:  

``` bash
my-slide $ npx manage-slide custom-portal
# main 里面就是 portal 页的代码
my-slide $ ls main
index.html index.js
```

2. 按照正常的 HTML 开发即可, 里面可以使用全局变量 `window.__APP` 提供的一些信息, 具体看 **`window.__APP`** 章节

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

## TODO

* [ ] 暴露构建和开发配置, 类似 vue cli 中 `vue.config.js`  
