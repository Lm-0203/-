## umi

插件化的企业级前端应用框架

egg 为企业级框架和应用而生，基于node.js和koa



渐进式框架，主要是起服务，用到其他功能，直接引对应的插件，直接用就行

Umi，中文可发音为**乌米**，是可扩展的企业级前端应用框架。Umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。然后配以生命周期完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。



## 命令行创建新的页面

npx umi g page demo --typescript

npx umi page demo/_layout --typescript

npx umi g page demo/index --typescript

npx umi g page demo/my --typescript





## 支持的路由



### 配置式路由

.umirc.ts 项目配置文件

这个配置文件中的路由是配置式路由

想用配置式路由，直接在这个文件里面改routes属性的值就行，用约定式路由，就把这个属性注释掉

```js
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 想让约定式路由生效，把routes属性注释掉
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
});

```



### 约定式路由



### 二级路由

想创建二级路由，必须先执行这个命令 执行这个命令

npx umi page demo/_layout --typescript 

生成一个demo文件夹，以及demo里面的文件

```unknown

└── page
    ├── demo
        ├── _layout.css
        └── _layout.js
    └── 
```

_layout.js 里面的文件，需要进行修改

Page demo/_layout 改成 {props.children}

```jsx
import React from 'react';
import styles from './_layout.css';

interface Iprops{
    children: any
}    


export default function Page(props:Iprops) {
  return (
    <div>
      <h1 className={styles.title}>{props.children}</h1>
    </div>
  );
}
```





# dva

https://dvajs.com/knowledgemap/#reducer



effects 可以看做是vuex 异步里面的actions

![](img\umi.png)