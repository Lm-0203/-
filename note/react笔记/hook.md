# hook的规则

### **不要在循环，条件或嵌套函数中调用 Hook**

1. 只在最顶层使用hook
2. 只在react函数中调用hook





# 一、hook的概念和意义



**概念：hook是react16.8的新增特性。它可以让你在不编写class的情况下使用state以及其他的react特性。**

>注：hook只能在函数式组件内使用，不能在类组件和普通函数内使用
>
>钩子函数，本质上是一个函数，该函数可以挂载任何功能。
>
>可以增强函数组件的功能，让他理论上成为类组件的替代品
>
>官方强调：没有必要更改已经完成的类组件，官方目前没有计划取消类组件

- **类组件的缺点：**

1.状态逻辑复用难：

    1)缺少复用机制
    
    2)渲染属性和高阶组件导致层级冗余

2.繁琐的生命周期

    1)生命周期函数混杂不相干逻辑
    
    2)相干逻辑分散在不同生命周期

3.this指向困扰：

    1)内联函数过渡创建新句柄
    
    2)类成员函数不能保证this

- **函数式结合hook的优点：**
        
    1)函数组件无this问题

    2)自定义hook方便复用状态逻辑
    
    3)副作用的关注点分离

>注：hook是个渐进式策略，没有计划从react中移除class。最重要的是，Hook 和现有代码可以同时工作，你可以渐进式地使用他们



# 二、hook相关api

## useState

>1. useState 编写组件内部状态变量，用于在函数组件中使用状态

```
let [state,setState] = useState(0);

useState的参数：状态的初始值

useState的返回值为：当前state以及更新state的函数。
```

**setState是一个函数，参数有两种形式：**

    1>新值 setState(新值) 
    
    2>函数 setCount(fn)

如果新的state需要通过使用先前的state计算得出，那么可以使用第二种方式，将**函数**传递给setState。该函数将先接受先前的state，并返回一个更新后的值。

```
let [count,setCount] = useState(0);

const addCount = function(){
    setTimeout(() => {
        //setCount(count+1);  //第一种形式
        setCount(count => count+1); //第二种形式
    },3000)
}

return <div>
    {count}
    
    <button onClick={addCount}>add+</button>
</div>
```
注：第一种形式：当我设置为异步更新，点击按钮延迟3s之后去调用setCount函数，当我快速点击按钮时，也就是说在3s内多次去触发更新，但是只有一次生效，因为count的值没有变化。

当使用函数式更新state的时候，这种问题就没有了，因为它可以获取之前的state值，也就是代码中的prevCount每次都是最新的值。



### 原理

+ 当运行一个函数组件时（调用该函数）
+ 第N次运行useState
+ 检查该函数节点的状态(state)表格中是否存在下标N
  + 状态表格中无内容，使用默认值创建一个状态，将该状态加入到表格中，下标N-1，状态值为初始值
  + 存在的话，忽略掉默认值，直接得到状态值。



### 注意细节

+ useState 最好写到函数的起始位置，便于阅读

+ useState严禁出现在代码块（判断、循环）中

  + 这一和状态池有关系。

+ useState返回的函数，就是数组的第二项，引用不变，节约内存空间。

+ 如果使用函数改变数据，若数据和之前的数据完全相等(Object.is比较)，不会导致重新渲染，为了优化效率

+ 使用函数改变数据，传入的值，不会和原来的数据进行合并，会直接替换。

+ 如果要强制刷新组件

  + 类组件：使用forceUpdate函数

  + 函数组件：可以使用一个空对象 setState

    ```jsx
    const [, forceUpdate] = useState({});
    forceUpdate({});
    ```

    

+ 如果某些状态之间没有必然的联系，应该分化成不同的状态，而不要合并成一个对象。

+ 和类组件的状态一样，函数组件中，改变状态可能是异步的(在React合成事件中)。如果是异步的话，多个状态变化可能会合并以提高效率。此时，不能信任之前的状态，而应该使用回调函数改变状态。

  ```jsx
  <buttom 
    onClick={() => {
      // setN(n + 1);
      // setN(n + 1);
      setN(prev => prev + 1);   
      setN(prev => prev + 1);
      // 这里虽然说运行了两次setState,但是函数render只会调用一次，
    }} 
   />
  ```

  

## useEffect

>2.useEffect 函数组件中执行副作用操作

React 会等待浏览器完成画面渲染之后才会延迟调用 `useEffect`，因此会使得额外操作很方便。

+ 只有一个参数，没有第二个参数，只要函数更新就会执行
  + Similar to componentDidMount and componentDidUpdate:
  + 第一个参数可以返回一个函数，函数里面执行事件的卸载
    + 发送网络请求，手动变更 DOM，记录日志，这些都是常见的无需清除的操作。
    + 
+ 有两个参数，第二个参数是一个空数组，函数只会在第一次加载的时候执行一次
  + Similar to componentDidMount and componentDidUpdate:
  + 第一个参数返回一个回调函数，回调函数中执行的操作,相当于 componentWillUnmount
+ 有两个参数，第二个参数是依赖项，函数会在第一次加载的时候执行一次，之后依赖项发生变化的时候，再执行一次



```
相当于类组件内的 componentDidMount componentDidUpdate componentWillUnmount

useEffect(回调函数，[监听的状态])

1.如果没有第二个参数，会监听所有的状态

2.如果有第二个参数，第二个参数为空时，不监听任何的状态，不为空时，监听指定的状态。


```
<html>
<!--在这里插入内容-->
    <img src="https://note.youdao.com/yws/public/resource/16d7bbcc7d931a7a7dd844a8ef295ced/xmlnote/8A4DBC39E4724244A9C41638B240CC2B/34389"/>
</html>

### 注意细节

+ 副作用函数运行的时间点是在页面完成真实的UI渲染之后，因此它的执行是异步的，并且不会阻塞浏览器。

  + 与类组件中 componentDidMount 和 componentDidUpdate 的区别：
    + componentDidMount 和 componentDidUpdate  ，更改了真实dom，但是用户还没有看到更新，这两个函数是同步的。可能会会阻塞UI界面重绘。
    + useEffect中的副作用函数，是更改了真实DOM，并且用户已经看到了UI更新，才会执行。所以useEffeect中的副作用函数是异步的。不会阻塞UI界面重绘。

+ 每个组件中可以多次使用useEffect，但是不要放到循环判断条件体中。

+ useEffect中的副作用函数，可以有返回值，返回值必须是一个函数，该函数叫做清理函数，该函数运行时间点在每次运行副作用函数之前。首次加载组件不会运行。组件被销毁时，一定会运行。

+ useEffect函数，可以传递第二个参数

  + 第二个参数是一个数组
  + 数组中记录该副作用的依赖数据
  + 当数组重新渲染后，只有依赖数据与上次不一样时，才会执行副作用
  + 所以，当传递了依赖数据后，如果数据没有发生变化
    + 副作用函数仅在第一次渲染后运行
    + 清理函数仅在渲染组件后运行

+ 副作用函数中，如果使用了函数上下文中的变量，则由于闭包的影响，会导致副作用函数中的变量不会实时变化。

  ```jsx
  // 第一次App函数调用是首次加载，副作用函数中的n是第一次App函数调用的n
  // setState，App函数被重新调用，产生了新的上下文
  const App = () => {
    const [n, setN] = useState(0);
    useEffect(() => {
      setTimeout(() => {
        console.log(n); // 快速点击按钮到n=6，5s后可以看到 0, 1, 2, 3, 4, 5, 6。n 指向当前副作用函数指向的n。
      }, 5000);
    });
    return (
      <div>
        <h1>{n}</h1>
        <button onClick={() => setN(n + 1)}>n + 1</button>
      </div>
    );
  };
  ```

  

+ 副作用函数，在每一次注册时，会覆盖之前的副作用函数，因此尽量保持之前的副作用函数稳定。否则，控制起来会比较复杂。



## useContext

useContext 和 createContext 搭配使用

useContext函数用在子组件里面，useContext函数执行的时候，函数的参数是createContext() 的返回值

useContext函数执行的返回值是 createContext.provider 组件的value

>3. useContext 函数组件内的跨级组件传递参数

```jsx
import React,{Component,createContext,useState,useContext} from 'react';

const countContext = createContext();

// 之前
function Foo() {
  return <countContext.Consumer>
  	{value => <h1>{value}</h1>}
  </countContext.Consumer>
}

// 现在
function Foo(){

    let count = useContext(countContext);
    
    return <h1>{count}</h1>
}

function App(){
    let [count,setCount] = useState(0);
    return <countContext.Provider value={count}>
        <button onClick={() => {
            setCount(prev => prev+1)
        }}>add</button>
        <Foo/>
    </countContext.Provider>
}

export default App

```



```jsx
import React, {createContext, useContext} from 'react'
const context = createContext();

function Child() {
  let obj = useContext(context)
  return <button onClick={() => {
    console.log(obj);
  }}>点击</button>
}


function Father() {
  return <Child></Child>
}

export default function App() {
  return (
    <context.Provider value={{name: 123, age: 345}}>
      <div>
        <Father></Father>
      </div>
    </context.Provider>
    
  )
}

```



## useRef


>4. useRef  获取dom元素或者组件实例

```
let box = useRef();

<div ref={box}>ref</div>

<button onClick={()=>{
    box.current.style.background = 'red';
}}>改变div的颜色</button>

```



#### 类中使用dom

##### 使用方式

* 方式一  字符串形式

```js 
    // 设置  dom节点上设置ref="字符串"
    // 获取  this.refs.字符串
```

* 方式二  回调函数

```js
    // 设置  dom节点上设置ref={el=>this.dom=el}
    // 获取  this.dom
```

### 

## useCallback useMemo

> useCallback useMemo 性能优化

在React应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。

优化组件的重渲染行为，如果当前组件依赖的props没有变化，即不重新渲染：

解决的方式：1>函数式组件：memo  2>类组件：PureComponent  shouldComponentUpdate(nextProps,nextState){return true/false}   它们只是进行浅比较,只有第一层改变时，会引起组件的更新。

useMemo 它仅会在某个依赖项改变时才重新计算memoizedValue的值，这种有助于避免每次渲染时都进行高开销的计算。

```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
如果没有提供依赖项数组，useMemo在每次渲染时都会计算新的值。

useCallback是useMemo的简写：

    useMemo(()=>fn,[]) 
    
    useCallback(fn,[])

```
import React,{useState,useRef,useEffect,useCallback,memo} from 'react';

let Control = memo(function (props){
    console.log("render-Control")
    let {addTodo} = props;

    let iptRef = useRef(null);

    const addTodoFn = function(){
        let txt = iptRef.current.value.trim();
        if(!txt){
            return false;
        }
        let time = +new Date();
        addTodo({
            id:time,
            txt,
            complate:false
        })
        iptRef.current.value = ''
    }
    return <div>
        <h1>todolist</h1>
        <input ref={iptRef} type="text" placeholder="请输入todo"/>
        <button onClick={addTodoFn}>添加</button>
    </div>
})

const TodoItem = memo(function (props){
    console.log("render-TodoItem")
    let {removeTodo,toggleTodo,todo:{complate,txt,id}} = props;
    const delTodo = function(){
        console.log(id)
        removeTodo(id);
    }

    const change = function(){
        toggleTodo(id)
    }

    return <div>
        <label> {complate ? '完成':'未完成'}</label>
        <input type="checkbox" checked={complate} onChange={change}/>
        <span>{txt}</span>
        <button onClick={delTodo}>删除</button>
    </div>
})

const Todos = memo(function(props){
    console.log("render-todos")
    let {removeTodo,toggleTodo,todos} = props;
    return <div>
        {todos.map(item => <TodoItem 
            key={item.id} 
            todo={item}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
        />)}
    </div>
})

const Counter = memo(function(props){
    console.log("render====counter")
    return <div>{props.count}</div>
})

function TodoList(){

    let [todos,setTodos] = useState([]);

    let [count,setCount] = useState(0);
    
    //添加
    const addTodo = useCallback(function(todo){
        setTodos(prevTodos => [...prevTodos,todo]);
    },[todos])

    //删除
    const removeTodo = useCallback(function(id){
        setTodos(prevTodos => prevTodos.filter(item => item.id !== id))
    },[todos])

    //切换完成状态
    const toggleTodo = useCallback(function(id){
        setTodos(prevTodos => prevTodos.map(item => {
            return item.id === id ? {...item,complate:!item.complate} : item
        }))
    },[todos])

    const add = function(){
        setCount(prevCount => prevCount+1);
    }
    return <div>
        <Counter count={count}></Counter>
        <button onClick={add}>add</button>
        <Control addTodo={addTodo}></Control>
        <Todos todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo}></Todos>
    </div>
}

export default TodoList
```
如果避免不必要的子组件的重渲染，使用React.memo仅检查props变更。默认情况下其只会对复杂对象做浅层对比。

你以为代码中的let Control = memo(function(props){})已经优化了吗，然而并没有，当你在更改了父组件的状态，子组件依然会重新渲染，因为这关系到了React是如何进行浅层比较的，在子组件中addTodo是引用类型，所以他们是始终都不相等的，也就是fn === fn这样比较始终返回false，在基本数据类型比较时memo才会起作用。

这时就可以用到useCallback和useMemo的Hook

**注：子组件的函数是从父组件传递过来的，都可以用useCallback()**



## useImperativeHandle

用于子组件

将子组件的方法传递给父组件，让父组件可以去调用



父组件

```jsx
import React, {useRef} from 'react'

import Child from './Child';

export default function App() {

  const ipt = useRef();

  const btn = () => {
    console.log(ipt.current.setAdd()); // undefined
    console.log(ipt.current);
  }

  return (
    <div>
      {/* // 父组件 */}

      <button onClick={btn}>点击执行子组件函数</button>
      <Child ref={ipt} />
    </div>
  )
}

```



子组件

```jsx
import React, {useImperativeHandle, forwardRef} from 'react'

export default forwardRef(function Child(props, ref) {

    const setAdd = () => {
        console.log(123);
    }

    useImperativeHandle(ref, () => {
        return {
            setAdd,
            count: 1
        }
    })
    

    return (
        <div>
            这是子组件
        </div>
    )
})
```



# 三、自定义hook

将一些常用的，跨越多个组件的Hook功能，抽离出去形成一个函数，该函数就是自定义hook。

自定义hook，由于其内部需要使用hook功能，所以他本身也需要按照hook的规则实现：

+ 函数名必须用use开头
+ 调用自定义hook函数时，应该放到顶层







