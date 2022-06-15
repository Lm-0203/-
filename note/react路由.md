> 一个单页面应用里，可能会划分为多个页面（几乎完全不同的页面效果）（组件）
> 如果要在单页面应用中完成组件的切换，需要实现下面两个功能：
>
> 1. 根据不同的地址，展示不同的组件
> 2. 完成无刷新的跳转
> 我们把实现了以上两个功能的插件，称之为路由



## React Router

1. react-router：路由核心库包含诸多和路由功能相关的核心代码
2. react-router-dom：利用路由核心库，结合实际页面，实现跟页面路由密切相关的功能

如果在页面中实现路由，需要安装react-router-dom库

> url 地址组成：https://www.react.com:443/news/10202.html?a=1&b=2#abcdefg
>
> + 协议名（schema）：https
> + 主机名（host）：www.react.com
>   + ip地址
>   + 预设值：localhost
>   + 域名
>   + 局域网中电脑名称
> + 端口号（port）：443
>   + 如果协议是http，端口是80，则可以省略端口号
>   + 如果协议是https，端口是443，则可以省略端口号
> + 路径（path）：/news/1-2-1.html
> + 地址参数（search或query）：?a=1&b=2
>   + 附带的数据
>   + 格式：key=value&key=value...
> + 哈希（hash或锚点）：#abcdefg
>   + 附带的数据

## 路由的两种模式
### Hash Router 哈希路由

根据url中的哈希值 (#abcdefg) 来确定显示的组件

> 哈希值的变化不会导致页面刷新
>
> 这种模式的兼容性最好

用原生js获取哈希值

location.hash

### Borswer History Router 浏览器历史记录路由

根据页面的路径决定渲染哪个组件

HTML5出现后新增了History Api，从此以后，浏览器拥有了改变路径而不刷新页面的方式

History 表示浏览器的历史记录，用栈的方式

访问方式：window.history

属性信息：

+ history.length：获取栈中的数据数量

+ history.pushState(三个参数)：向当前历史记录栈中加入一条新的记录

  + 参数1：附加的数据，自定义的数据，可以支持任何类型
  + 参数2：页面标题，目前大部分浏览器不支持
  + 参数3：新的地址

  ```js
  history.pushState('附加的数据', null, '/a/b/c');
  // 函数执行完后会跳转路径，但是不会刷新页面
  // 如果之前地址是 www.baidu.com
  // 函数执行完之后或变成 www.baidu.com/a/b/c
  // history.state 可以获取参数1的值
  ```

+ history.replaceState：将当前指针指向的历史记录，替换为某个记录



# 路由组件

## HashRouter BrowserRouter

通常情况下，Router 组件只有一个，将该组件包裹整个页面

## Route 组件

根据不同的地址，展示不同的组件

重要属性

+ path：匹配的路径

  + 默认情况下不区分大小写。如果要区分路径的大小写，可以设置 sensitive 属性为true 来区分大小写

  + 默认情况下，只匹配初始目录，如果要精确比配，配置 exact 属性为true

  + 如果不写path，会匹配任意路径

  + path 可以写数组

    ```jsx
    <Route path={['/news', '/news/:year/:month/:day', '/n']}>
    ```

    

+ element：匹配成功后要展示的组件

Route 组件可以写到任意的地方，只要它是Router元素的后代组件就可以

```jsx
import React from 'react';
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

function CompA() {
  return <div>组件A</div>
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route sensitive exact path='/a' element={<CompA></CompA>} >
          	<h1>一定会看到的内容</h1> // 有可能当前的路径是 /efg
          </Route>
         <Route sensitive exact path='/a/b' component={CompB} />
       </Switch>
    </BrowserRouter>
  );
}

export default App;
```



## Switch 组件

写到 Switch 组件中的Router组件，当匹配到第一个Route组件后，会立即停止匹配

由于Switch会循环所有子元素，然后让每一个子元素去完成匹配，若匹配到，则渲染对应的组件，然后停止循环。因此，不能在 Switch 的子元素中，使用除Route外的其他组件。



# 路由信息

Router 组件会创建一个上下文，并且，向上下文中注入一些信息。

该上下文对开发者是隐藏的。

Router 组件如果匹配到了地址，会将这些上下文中的信息，作为属性，传入对应的组件。

我们通常使用第三方库 query-string，用来解析一些参数

react-router 使用了第三方库：Path-to-RegExp。该库将一个字符串正则转换成真正的正则表达式。

## history

并不是window.history对象，可以利用该对象无刷新跳转地址

> **为什么没有直接使用window.history对象**
>
> + React-Router 中有两种模式：Hash，History，如果直接使用 window.history，只能支持一种模式，如果要使用另一种模式，可能是另一种格式的代码
> + 当使用window.history.pushState方法时，没有办法收到任何通知，将导致React没有办法知道地址发生了变化，就没有办法刷新组件
> + 

+ push： 将某个新的地址入栈（历史记录栈）
  + props.history.push('/b'); // 只能写相对路径，不能写绝对路径
  + 参数1：新的地址
  + 参数2：可选，附加的状态数据
    + 获取状态数据  history.location.state
+ replace：将某个新的地址替换掉当前栈中的地址



## location

props.location === props.history.locaiton => true

但是和window.location 不一样

location 对象中记录了当前地址的相关信息

+ hash
+ pathname
+ search
+ state



## match

该对象中保存了路由匹配的相关信息

+ params：获取路由规则中对应的数据
+ isExact：事实上，当前的路径和路由配置的路径是否是精确匹配的



## 向某个页面传入数据的方式

1. 使用state：在push页面时，加入state参数，

2. 利用search：把数据填写到地址栏中的问号后

3. 利用hash：把数据填写到hash后

4. 利用params：把数据填写到路径（string pattern）中 /news/:year/:month/:day 

   ```jsx
   // 页面地址url也必须是完整的，/news/2022/06/16, 如果只有 /news 的话，会找不到页面
   // 不是一定要用斜杠 也可以 /news-:year-:month-:day
   // 加问号代表可传可不传 /news/:year?/:month?/:day? 这种情况下，就可以用 /news 匹配到对应的路由组件
   <Route path='/news/:year/:month/:day' />
   <Route path='/news/:year(\d+)/*' exact /> // 对应 /news/2022/xxxx
   ```



非路由组件获取路由信息

+ 将路由信息从父组件，一层一层传递给子组件
+ 使用react-router提供的高阶组件，包装要使用的组件，该组件返回一个新组件，新组件向提供的组件注入路由信息。

