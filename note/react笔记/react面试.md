# react是什么？

**讲概念 说用途 理思路 优缺点**

**采用非线性的结构化模式阐述答案**

+ 讲概念： 技术本质
+ 说用途：简短说明技术用途
+ 理思路：概要说明核心技术思路
+ 优缺点：
  - 独特优势
  - 个别缺点



React中只有组件，没有页面，没有控制器，也没用模型

React只关心两件事，数据与组件

React的核心思路：声明式，组件化，通用性

React将Dom声明为虚拟Dom，

声明式编程的优势在于直观，可以做到一目了然，也便于组合

组件化可以降低系统间功能的耦合性，提高功能内部的聚合性

<u>React是一个网页UI框架，通过组件化的方式解决视图层开发复用的问题，本质是一个组件化框架。</u>

<u>他的核心思路有三点，分别是声明式，组件化与通用性。</u>

<u>声明式的优势在于视图的拆分与模块的复用，可以更容易做到高内聚低耦合</u>

<u>通用性在于一次学习，随处编写。比如React Native，React 360等，这里主要靠虚拟Dom来保证实现。</u>

React主要用于构建UI。你可以在React里传递多种类型的参数，如声明代码，帮助你渲染出UI、也可以是静态的HTML DOM元素、也可以传递动态变量、甚至是可交互的应用组件。

Vue.js 是一套构建用户界面的渐进式框架。 Vue 只关注视图层, 采用自底向上增量开发的设计。



命令式方法的一个常见示例是使用jQuery或DOM事件在DOM中查找元素。 您告诉浏览器确切的操作，而不是告诉浏览器您需要什么。

React声明式方法为我们抽象了这一点。 我们只是告诉React我们希望组件以特定的方式呈现，并且我们以后不必再与DOM交互来引用它。



# 声明式编程

- 声明式编程是告诉计算机需要计算“什么”而不是“如何”去计算
- 任何没有[副作用](https://baike.baidu.com/item/副作用)的编程语言，或者更确切一点，任何引用透明的编程语言
- 任何有严格计算逻辑的编程语言

个人理解： 因为react用的是虚拟dom，虚拟dom映射到浏览器，告知浏览器我需要这样的一个结构，然后你去渲染吧，操作dom的时候，react 虚拟dom的结构发生改变，发生改变以后，再次告诉浏览器，我需要的结构改变了，通过diff算法，在浏览器中映射这一部分元素，只重新渲染这一部分





# 为什么react要用jsx？



**为什么不用其他的？**

三部曲：一句话解释jsx，核心概念，方案对比

没有JSX的时候

```js
class Hello extends React.Component{
    render() {
        return React,createElement(
            'div',
             null,
             `Hello ${this.props.toWhat}`
        );
    }
}

ReactDOM.render(
    第一个参数是组件名，第二个参数是props对象，第三个参数，不知道
	React.createElement(Hello, {toWhat: 'World'}, null),
    document.getElementById('root')
);
```



Babel插件如何实现JSX到JS的编译？

```js
module.exports = function(babel) {
    var t = babel.types;
    return {
        name: "custom-jsx-plugin",
        visitor: {
            JSXElement(path) {
                var openingElement = path.node.openingElement;
                var tagName = openingElement.name.name;
                var args = [];
                args.push(t.stringLiteral(tagName)); 
                var attribs = t.nullLiteral(); 
                args.push(attribs); 
                var reactIdentifier = t.identifier("React"); //object
                var createElementIdentifier = t.identifier("createElement"); 
                var callee = t.memberExpression(reactIdentifier, createElementIdentifier)
                var callExpression = t.callExpression(callee, args);
                callExpression.arguments = callExpression.arguments.concat(path.node.children);
                path.replaceWith(callExpression, path.node); 
            }
        }
    }
}

```



# 如何避免生命周期中的坑？



+ 在不恰当的时机调用了不合适的代码
+ 在需要调用的时候，却忘记了调用

通过梳理生命周期，明确周期函数的职责，确认什么时候该做什么事儿，以此来避免坑



当我们在讨论React组件生命周期的时候，一定是在讨论类组件（Class Component）。

函数式组件没有生命周期的概念，因为它本身就是一个函数，只会从头执行到尾



生命周期是一个抽象的概念，能让开发者产生联想记忆的往往是那些函数，比如componentDidMount，componentWillMount等等。然而这些函数并不是他的生命周期，只是在生命周期中按顺序被调用的函数。

挂载  =>  更新  =>  卸载这一React组件完整的过程，才是生命周期。

### 挂载阶段

挂载阶段是指组件从初始化到完成加载的过程。

+ constructor

+ static getDerivedStateFromProps()

+ render()

+ componentDidMount()

  > **注意**
  >
  > 下述生命周期方法即将过时，在新代码中应该[避免使用它们](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html)：
  >
  > - [`UNSAFE_componentWillMount()`](https://zh-hans.reactjs.org/docs/react-component.html#unsafe_componentwillmount)

#### constructor

constructor是类通用的构造函数，常用于初始化。所以在过去，constructor通常用于初始化state与绑定函数。接收父级传递的props

常见写法如下

```js
import React from 'react';
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        // do some stuff
    }
    render() {
        return null
    }
}
```



**当类属性开始流行之后，React社区的写法发生了变化，即去除了constructor。**



```js
import React from 'react';
class Counter extends React.Component {
    state = {
        count: 0,
    }
    handleClick = () => {
        // do some stuff
    }
    render() {
        return null
    }
}
```



+ 社区中去除constructor的原因
  - constructor中并不推荐去处理初始化以外的逻辑
  - 本身constructor并不属于React的生命周期，他只是Class的初始化函数
  - 通过移除constructor，代码也会变得更为简洁

#### getDerivedStateFromProps

本函数的作用是组件在props变化时更新state，访问不到this实例，它的触发时机是： 

+ 当props被传入时；
+ state发生变化时；
+ forceUpdate被调用时

最常见的一个错误是认为只有props发生变化时，getDerivedStateFromProps才会被调用，而实际只要父级组件重新渲染时，getDerivedStateFromProps就会被调用。所以是外部参数，已经是props传入时就会发生变化。

以下是官方文档中的例子：

```js
class ExampleComponent extends React.Component {
    state = {
        isScrollingDown: false,
        lastRow: null,
    };
	
	static getDerivedStateFromProps(props, state) {
        console.log(this); // undefined
        // 不相等表明数据发生了更新
        if(props.currentRow !== state.lastRow) {
            return {
                isScrollingDown: props.currentRow > state.lastRow;
            	lastRow: props.currentRow
            }
        }
        // 返回 null 表示无需更新state
        return null
    }
}
```

依据官方说法，它的使用场景是很有限的。由于太多错误使用的案例，React官方团队甚至写了一篇 **你可能不需要使用派生state**。文中主要列举了两种反模式的使用方式：

1. 直接复制prop到state；
2. 在props变化后修改state

这两种写法除了增加代码的维护成本，没有带来任何好处



#### UNSAFE_componentWillMount

**组件渲染前，即将被废弃**

也就是componentWilMount，本来用于组件即将加载前做某些操作，但目前被标记为弃用。因为在React异步渲染机制下，该方法可能被多次调用。

一个常见的错误是componentWillMount跟服务端同构渲染的时候，如果在该函数里面发起网络请求，拉取数据，那么会在该函数里面发起网络请求，拉取数据，那么会在服务器端与客户端分别执行一次。所以更推荐在**componentDidMount**中完成数据拉取操作

一个良好的设计应该是不让用户有较高的理解成本，而该函数却与之背道而驰，所以已被标记弃用



#### render

render函数返回的JSX结构，用于描述具体的渲染内容。但切记，render函数并没有真正的去渲染组件，渲染组件是依靠React操作JSX结构描述结构来完成的。还有一点需要注意，render函数应该是一个纯函数，不应该在里面产生副作用，比如调用setState或者绑定事件。

那么为什么不能setState呢?因为render函数在每次渲染时都会被调用，而setState会触发渲染，会造成死循环。

那又为什么不能绑定事件呢？因为容易被频繁调用注册。



#### componentDidMount

请求数据 获取真实dom 添加事件

componentDidMount主要用于组件加载完成时做某些操作，比如发起网络请求或者绑定事件，该函数是接着render之后调用的。但是componentDidMount一定是在真实DOM绘制完成之后调用么？在浏览器端，我们可以这么认为

但在其他场景中，尤其是React Native 场景下，componentDidMount并不意味着真实的界面已经绘制完毕。由于机器的性能所限，视图可能还在绘制中。



### 更新阶段

有两种，props更新，state更新

更新阶段是指外部props传入，或者state发生变化时的阶段。该阶段我们着重介绍一下6个函数：

+ static getDerivedStateFromProps()

+ shouldComponentUpdate(nextProps, nextState)

+ render()

+ getSnapshotBeforeUpdate()

+ componentDidUpdate()

  > 注意:
  >
  > 下述方法即将过时，在新代码中应该[避免使用它们](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html)：
  >
  > - [`UNSAFE_componentWillUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#unsafe_componentwillupdate)
  > - [`UNSAFE_componentWillReceiveProps()`](https://zh-hans.reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops)

老师的答案

componentWillReceiveProps （state更新没有这个）  被废弃

shouldComponentUpdate(nextProps, nextState) 优化 

componentWillUpdate 更新前 被废弃

render

componentDidUpdate 更新完毕

#### UNSAFE_componentWillReceiveProps(nextProps)

**已经被标记废弃，在项目里面减少使用**

该函数已经被**标记弃用**，因为其功能可能被函数getDerivedStateFromProps所替代。

另外，当 getDerivedStateFromProps 存在时 UNSAFE_componentWillReceiveProps 不会被调用

父级调用了setState就会被触发

#### getDerivedStateFromProps

同挂载阶段表现一致



#### shouldComponentUpdate(nextProps, nextState)

组件是否更新，该方法返回**true**或者**false**来确定是否需要重新触发新的渲染。因为渲染触发最后一道关卡是性能优化的必争之地。通过添加判断条件来阻止不必要的渲染。



React官方提供了一个通用的优化方案，也就是PureComponent。PureComponent的核心原理就是默认实现了shouldComponentUpdate函数，在这个函数中对props和state进行浅比较。用来判断是否更新



```js
shouldComponentUpdate(nextProps, nextState) {
  // 浅比较仅比较值与引用，并不会对 Object 中的每一项值进行比较
  if (shadowEqual(nextProps, this.props) || shadowEqual(nextState, this.state) ) {
    return true
  }
  return false
}
```



#### UNSAFE_componentWillUpdate

同样已经废弃，因为后续的React异步渲染设计中，可能会出现组件暂停更新渲染的情况



#### render

同挂载阶段一样



#### getSnap[snæp]shot[ʃɑːt]BeforeUpdate

getSnapshotBeforeUpdate方法是配合React新的异步渲染机制，在DOM更新发生前被调用，返回值将作为componentDidUpdate的第三个参数

官方用例如下：

```jsx
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }
 
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }
 
  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }
 
  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
```



#### componentDidUpdate

更新完毕

正如上面的案例，getSnapshotBeforeUpdate 的返回值会作为 componentDidUpdate 的第三个参数使用。

componentDidUpdate 中可以使用setState，会触发重渲染，但一定要小心使用，避免死循环。



### 销毁阶段（卸载阶段）

只有一个回调函数

#### componentWillUnmount 组件销毁前

该函数主要用于执行清理工作。一个比较常见的bug就是忘记在 componentWillUnmount 中取消定时器，导致定时操作依然在组件销毁后不停地执行。所以一定要在该阶段解除事件绑定，取消定时器。

![](img\生命周期.png)



### 以下三种情况会触发重新渲染

#### 函数组件

函数组件在任何情况下都会重新渲染。他并没有声明周期，但官方提供了一种方式优化手段，那就是React.memo。

```js
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

React.memo 并不是阻断渲染，而是跳过渲染组件的操作并直接复用最近一次渲染的结果，这与 shouldComponentUpdate 是完全不同的。



#### React.component

如果不使用 **shouldComponent** 函数，那么有两种情况触发重新渲染。

1. 当state发生变化时。
2. 当父级组件的props传入时，无论props有没有变化，只有传入就会引发重新渲染



#### React.PureComponent

**PureComponent** 默认实现了**shouldComponentUpdate** 函数。所以仅在props与state浅比较后，确认有变更时才会触发重新渲染。



点击按钮没有反应

```jsx
import React, { Component, PureComponent } from 'react'


class Child extends PureComponent{
    render() {
        console.log('child'); // 只在组件刚开始挂载的时候，打印一下，点击按钮的时候不会打印
        return (
            <div> {this.props.person.username} </div>
        )
    }
}

export default class shouldCom extends Component {
    state = {
        username: '用户名',
        person: {
            username: '修改'
        }
    }

    change = () => {
        let {person} = this.state;
        person.username = '改过来了';
        this.setState({
            person
        })
    }

    render() {
        return (
            <div>
                <Child person={this.state.person} />
                <button onClick={this.change}>修改</button>  // 点击按钮child组件不会重新渲染
            </div>
        )
    }
}

```



点击按钮有反应，child组件会重新渲染

```jsx
import React, { Component, PureComponent } from 'react'


class Child extends PureComponent{
    render() {
        console.log('child');
        return (
            <div> {this.props.username} </div>
        )
    }
}

export default class shouldCom extends Component {
    state = {
        username: '用户名',
        person: {
            username: '修改'
        }
    }

    change = () => {
        let {person} = this.state;
        person.username = '改过来了';
        this.setState({
            person
        })
    }

    render() {
        return (
            <div>
                <Child username={this.state.person.username} />
                <button onClick={this.change}>修改</button>
            </div>
        )
    }
}

```



#### React.memo

和 PureComponent 一样，只能监测一层

memo: 针对整个组件是否重新渲染

useMemo useCallback : 针对的是一段程序

```jsx
import React, { Component, PureComponent, memo } from 'react'


// class Child extends PureComponent{
//     render() {
//         console.log('child');
//         return (
//             <div> {this.props.username} </div>
//         )
//     }
// }

const Child = memo((props) => {
    console.log('child');
    return (
        <div> {props.username} </div>
    )
})

export default class shouldCom extends Component {
    state = {
        username: '用户名',
        person: {
            username: '修改'
        }
    }

    change = () => {
        let {person} = this.state;
        person.username = '改过来了';
        this.setState({
            person
        })
    }

    render() {
        return (
            <div>
                <Child username={this.state.person.username} />
                <button onClick={this.change}>修改</button>
            </div>
        )
    }
}
```





#### 错误边界

错误边界是一种React组件。这种组件可以捕获并打印发生在其子组件树任何位置的JavaScript错误并且它会渲染出备用UI。如下React官方所给出的示例：

```jsx
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    
    static getDerivedStateFromError(error) {
        // 更新state使下一次渲染能够显示降级后的 UI
        return {hasError: true};
    }
    
    // 渲染时的报错，只能通过 componentDidCatch 捕获
    componentDidCatch(error, errorInfo) {
        // 将错误日志上报给服务器
        logErrorToMyService(error, errorInfo);
    }
    
    render() {
        if(this.state.hasError) {
            // 自定义降级后的UI并渲染
            return <h1>Something went wrong</h1>
        }
        return this.props.children
    }
}
```



无论是React，还是React Native, 如果没有错误边界，在用户侧看到的现象会是这样的：在执行某个操作时，触发了bug，引发了崩溃，页面突然白屏。

需要注意的是，渲染时的报错，只能通过 componentDidCatch 捕获



> 避免生命周期中的坑需要做两件事：
>
> + 不在不恰当的时间调用不该调用的代码
> + 在需要调用的时候，不要忘了调用



> 主要有七种情况容易造成生命周期中的坑：
>
> + **getDerivedStateFromProps ** 容易编写反模式代码，使受控组件和非受控组件区分模糊
> + **componentWillmount**  已被标记弃用，不推荐使用，主要原因是新的异步渲染构架会导致它被多次调用。所以网络请求及事件绑定代码应该移至  **componentDidMount**  中。
> + **componentWillReceiveProps ** 同样被标记弃用，被 **getDerivedStateFromprops** 所取代，只要原因是性能问题。
> + **shouldComponentUpdate** 通过返回true或者false来确定是否需要触发新的渲染。主要用于性能优化
> + **componentWillUpdate** 同样是由于新的异步渲染而被标记弃用，不推荐使用，原先的逻辑可结合**getSnapshotBeforeupdate** 与 **componentDidUpdate** 改造使用。
> + 如果在 **componentWillUnmount** 函数中忘记解除事件绑定，取消定时器等操作，容易引发bug
> + 如果没有添加错误处理边界，当渲染发生异常时，用户将会看到一个无法操作的白屏，所以一定要添加。

### React请求应该放在哪里？为什么？

对于异步的请求，应该放在componentDidMount中操作。从时间顺序来看，除了componentDidMount还能有以下选择：

+ constructor: 可以放，但从设计上而言不推荐。constructor主要是用于初始化state与函数绑定，并不承载业务逻辑。而且随着类属性的流行，constructor已经很少使用了。
+ componentWillMount： 已被标记废弃，在新的异步渲染架构下会触发多次渲染，容易引发bug，不宜与未来React升级后的代码维护



所以React的请求放在**componentDidMount** 里是最好的选择。



# 类组件与函数组件的区别？

+ 了解两种组件的编写模式
+ 具备在合适的场景下选用合适技术栈的能力

### 函数式组件

> 纯展示组件

+ 没有生命周期
+ 没有状态
+ 没有this
+ 解析快

### 类组件

+ 有生命周期
+ 有状态
+ this
+ 解析慢

## 相同点

组件是React可复用的最小代码片段，他们会返回要在页面中渲染的React元素。因为组件是React的最小编码单位。所以无论是函数组件还是类组件，在使用方式和最终呈现效果上都是完全一致的。

## 不同点

### 基础认知

#### 类组件和函数组件本质上代表了两种不同的设计思想和心智模式

+ 类组件的根基是 OOP（面向对象编程），所以他有继承、有属性、有内部状态的管理
+ 函数组件的根基是FP，也就是函数式编程。它属于“结构化编程”的一种，与数学函数思想类似。也就是假定输入与输出存在某种映射关系，那么输入一定的情况下，输出必然是确定的。



**相较于类组件，函数组件更纯粹，简单，已测试**。 这是它们本质上最大的不同。

有一个广为流传的经典案例，是这样描述函数组件的确定性的（有的文章会将这种确定性翻译为函数组件的 **值捕获特性**），案例中的代码是这样的： 

```jsx
const Profile = (props) => {
    const showMessage = () => {
        alert('用户是' + props.user);
    };
    const handleClick = () => {
        setTimeout(showMessage, 3 * 1000);
    };
    return (<button onClick={handleClick}>查询</button>)
}
```



由于没有查询接口，所以通过setTimeout来模拟网络请求。

那如果通过类组件来描写，我们大致上会这样重构：

```jsx
class Profile extends React.component{
    showMessage = () => {
        alert('用户是' + this.props.user)
    }
	handleClick = () => {
        setTimeout(this.showMessage, 3 * 1000)
    }
    render() {
        return <button onClick={handleClick}>查询</button>
    }
}
```



表面上看这两者是等效的。正因为存在这样的迷惑性，所以这也是此案例会如此经典的原因。

接下来就非常神奇了，也是这个案例的经典步骤：

+ 点击其中某一个查询按钮；
+ 在3秒内切换选中的按钮；
+ 查看弹框的文本

```jsx
import React, { Component } from 'react';
import ProfileFunction from './ProfileFunction';
import ProfileClass from './ProfileClass';

export default class App extends Component {
    state = {
        user: '小明',
    }
    render() {
        return (
            <div>
                <label>
                    <b> : </b>
                    <select
                        value={this.state.user}
                        onChange={e => this.setState({user: e.target.value})}
                    >
                        <option value="小明">Dan</option>
                        <option value="小白">Sophie</option>
                        <option value="小黄">Sunil</option>
                    </select>
                </label>
                <p>
                    <ProfileFunction user={this.state.user} />
                    <b> (function) </b>
                </p>

                <p>
                    <ProfileClass user={this.state.user} />
                    <b> (class) </b>
                </p>
            </div>
        )
    }
}

```

这时，会看到一个现象：

+ 使用函数组件时，当前账号是小白，点击查询按钮，然后立马将当前账号切换成小黄，但弹框显示的内容依然是小白；
+ 而当使用类组件是，同样的操作下，弹框显示的是小黄。

就是类组件会很快的发生变化，而函数组件不会

为什么会这样呢？

因为当切换下拉框后，新的user作为props传入了类组件中，所以此时组件内的user已经发生了变化。

如下代码所示：

```jsx
showMessage = () => {
    alert('用户是' + this.props.user)
}

// 这里的this存在一定的模糊性，容易引起错误使用。如果希望组件正常运行，那么我们可以这样修改：
showMessage = (user) => {
    alert('用户是' + user)
}
handleClick = () => {
    const {user} = this.props;
    setTimeout(() => this.showMessage(user), 3 * 1000)
}

```

但是在函数组件的闭包中，这就不是问题，他捕获的值永远是确定且安全的。



### 独有能力

#### 类组件通过生命周期包装业务逻辑，这是类组件特有的。

```jsx
class A extends React.component{
    componentDidMount() {
        fetchPosts().then(posts => {
            this.setState({ posts });
        })
    }
    render() {
        return ...
    }
}
```

在还没有hooks的时代，函数组件的能力是比较弱的。在那个时候尝尝用高阶组件包裹函数组件模拟声明周期。当时流行的解决方案是Recompose。

如下代码所示：

```jsx
const PostsList = ({ posts }) => (
    <ul>{ posts.map(p => <li>p.title</li>) }</ul>
)

const PostsListWithData = lifecycle({
    componentDidMount() {
        fetchPosts().then(posts => {
            this.setState({ posts })
        })
    }
})(PostsList)
```

这一解决方案在一定程度上增加了函数组件的能力，但它并没有解决业务逻辑掺杂在生命周期中的问题。Recompose 后来加入了React团队，参与了Hooks标准的制定，并基于Hooks创建了一个完全耳目一新的方案。

这个方案从全新的角度解决问题： 不是让函数组件去模仿类组件的功能，而是提供新的开发模式让函数组件渲染与业务逻辑更分离。设计出如下代码：

```jsx
import React, {useState, useEffect} from 'react';

function App() {
    const [data, setData] = useState({ posts:[] });
    useEffect(() => {
        (async () => {
            const result = await fetchPosts();
            setData(result.data);
        })()
    }, []);

    return (
        <ul>{ data.posts.map(p => <li>{p.title}</li> ) }</ul>
    )
}

export default App;

```



### 使用场景

在设计模式上，因为类本身的原因，类组件是可以实现继承的，而函数组件缺少继承的能力。

当然在React中也是不推荐继承已有的组建的，因为继承的灵活性更差，细节屏蔽过多，所以有这样一个铁律，**组合优于继承** 。详细的设计模式会在之后具体讲解



### 性能优化

+ 类组件的优化主要依靠 **shouldComponentUpdate** 去阻断渲染
+ 函数组件一般靠React.memo来优化。React.memo并不是去阻断渲染，他具体的作用在之前的内容中。（三种情况会触发渲染中，函数组件的方式中有React.memo）



### 未来趋势

由于React Hooks 的推出，函数组件成了社区未来主推的方案。

React 团队从 Factbook 的实际业务出发，通过探索时间切片与并发模式，以及考虑性能的进一步优化与组件间更合理的代码拆分结构后，认为类组件的模式并不能很好的适应未来的趋势。

他们给出了三个原因：

+ this的模糊性
+ 业务逻辑散落在生命周期中
+ React的组件代码缺乏标准的拆分方式

而使用Hooks的函数组件可以提供比原先更细粒度的逻辑组织与复用，且能更好地适用于时间切片与并发模式



## 区别

> 作为组件而言，类组件与函数组件在使用上没有呈现任何不同，性能上在现代浏览器中也不会有差异
>
> 它们在开发时的心智模型上却存在巨大的差异。类组件是基于面向对象编程的，它主打的是继承，生命周期等核心概念；而函数组件内核是函数式编程，主打的是immutable(**不变的；不可变的；不能变的**)，没有副作用，引用透明等特点
>
> 之前，在使用场景上，如果存在需要使用生命周期组件，那么主推类组件；设计模式上，如果需要继承，那么主推类组件
>
> 但现在由于React Hooks 的推出，生命周期概念的淡出，函数组件可以完全取代类组件。
>
> 其次继承并不是组件最佳的设计模式，官方更推崇“组合优于继承”的设计概念，所以类组件在这方面的优势也在淡出。
>
> 性能优化上，类组件主要依靠shouldComponentUpdate 阻断渲染来提升性能，而函数组件依靠 React.memo缓存渲染结果来提升性能
>
> 从上手程度而言，类组件更容易上手，从未来趋势来看，由于React Hooks 的土池，函数组件成了未来社区主推方案。
>
> 类组件在未来时间切片与并发模式中，由于生命周期带来的复杂度，并不易于优化。而函数组件本身轻量简单，且在Hooks 基础上提供了比原先更细粒度的逻辑组织与复用，更能适应React的未来发展

函数式组件，没有内部状态，没有生命周期，解析快

类组件，有内部状态，有生命周期，解析慢

# 如何设计React组件

React组件有哪些分类？可以直接采用React社区中非常经典的分类模式：

+ 把值作展示，独立运行，不额外增加功能的组件，成为**哑组件**，或**无状态组件**，还有一种叫法是展示组件；
+ 把处理业务逻辑与数据状态的组件成为**有状态组件** ，或 **灵巧组件**， **灵巧组件** 一定包含至少一个灵巧组件或展示组件。

从分类中可以看出 **展示组件的复用性更强，灵巧组件则更专注于业务本身**。

## 展示组件

展示组件内部是没有状态管理的，正如其名，就像一个个装饰物一样，完全受制于外部的props控制。战术组件具有极强的通用性，复用率也很高，往往与当前的前端工程关系相对薄弱，甚至可以做到跨项目级的复用。

### 代理组件

代理组件常用于封装常用属性，减少重复代码。关于代理组件你应该不陌生，可能经常会写。

举一个最常见的例子，当需要定义一个按钮的时候，需要在按钮上添加 button 属性，代码如下：

```html
<button type="button"></button>
```



当然在React中使用的时候，不可能每次都写这样一段代码，非常麻烦，常见的做法是封装：

```jsx
const Button = props => <button type="button" {...props}></button>
```

在开发中使用Button组件代替原生的button，可以确保type一致。

在使用App开发时，也可以采用类似的设计模式，大致情况如下：

```jsx
import {Button as AntdButton} from 'antd'

```



# React Hooks



hook 是 react16.8 的新增特性。他可以让我们在不便携class 的情况下使用 state 以及其他的 react 特性。

> **注：hook 只能在函数式组件内使用，不能在类组件内使用**



## 类组件的缺点

+ 逻辑复用难
  + 缺少复用机制
  + 渲染属性和高阶组件导致层级冗余
+ 趋向复杂难以维护

  + 生命周期函数混杂不相干逻辑
  + 相干逻辑分散在不同生命周期

+ this指向困扰
  + 内联函数过渡创建新句柄
  + 类成员不能保证this





# Virtual Dom 的工作原理是什么？

js的渲染速度比html渲染的快，操作虚拟dom比真实dom方便



## 讲解概念

虚拟 dom 的工作原理 是通过js 对象模拟dom 中的节点。 

虚拟 dom 是描述真实dom 的就是对象

## 说用途

在Facebook构建react的初起，考虑到要提升代码抽象能力，避免人为的dom操作，降低代码整体风险，所以引入虚拟dom



## 理思路

虚拟dom，是通过js对象模拟dom中的节点，而js对象是react.createElement 的返回值，虚拟 DOM 在实现上通常是 Plain Object，以 React 为例，render 函数中的 jsx 会在 babel 插件的作用下，编译为 react.createElement 执行 jsx 中的属性参数



React.createElement 执行后返回一个 plain Object [pleɪn]  【纯对象(plain object)，，即使用{}或者new Object创建的对象】，他会描述自己的tag类型，有哪些属性，以及有哪些子元素。这些plain Object 通过树形结构生成一颗dom树。当状态要发生改变时，将变更前后的虚拟dom树进行差异比较，这个过程称为diff，生成的结果称为patch [pætʃ] 【补丁，修补文件】。计算之后，会渲染patch完成对真实 dom 的操作



## 优点

+ 改善大规模Dom操作的性能，
+ 规避XSS风险，
+ 能以较低成本实现跨平台开发。当 React 向 iOS、Android 开发时，只需要通过 React Native 提供 Native 层的元素渲染即可完成。



## 缺点

+ 内存占用较高 

  > 因为当前网页的虚拟 DOM 包含了真实 DOM 的完整信息，而且由于是 Object，其内存占用肯定会有所上升。

+ 高性能应用场景难以优化 

  > 例如 Google Earth 这类的 高性能前端应用 在技术选型上 往往不会选择 React





## 讨论边界

### 虚拟 DOM 一定比真实的 DOM 操作性能更高吗

如果是只是修改一个按钮的文案，虚拟dom 的操作怎么都不会比真实的dom操作快，

所以一定要在具体的场景下面讨论

大量的操作dom会导致网页性能的操作下降，这是react基于虚拟dom 的diff 处理 与 批处理操作，可以降低dom 的操作范围与频次，提成页面性能，这时虚拟dom的渲染速度就比真实dom快，



如果是首屏加载 或 微量操作，虚拟dom 的渲染速度就会比真实dom慢



### 虚拟dom就一定会避开xss吗？

不一定，虚拟dom内部 确实有一个字符转义，所以确实可以做到这一点

但react 中存在风险，因为 react 留有 dangerouslySetInnerHTML API绕过转义



### 没有虚拟dom就不能实现跨平台吗？

比如 NativeScript 就没有虚拟dom，它是通过提供兼容原生 API 的 JS API 实现跨平台开发



### 虚拟dom的优势在哪里

跨平台的成本更低





# 与其他框架相比，react的diff算法有何不同

## 其他框架

+ vue
+ 类react框架，又被成为react-like框架，通常是指 Preact、inferno 等兼容react api 的框架



## react的diff算法

diff 算法会比较前后的虚拟dom，从而得到patches（补丁），然后与老的虚拟dom做对比，将其应用在需要更新的地方，得到新的虚拟dom，



### 大致流程

现在有一个真实的dom，首先会映射为虚拟dom，这个时候，我们删除了最后一个p节点和son2节点，得到一个新的虚拟dom，新的虚拟dom会和旧的虚拟dom进行差异对比，得到了patches对象，之后，对旧的真实dom进行操作，得到新的dom



### diff 的几种策略

+ web ui 中 dom 节点跨层级的移动操作特别少，可以忽略不计
+ 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会





