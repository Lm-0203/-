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

