

### react

### 概念：一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库
### react的特性：虚拟dom、单向数据流、组件化
### 遵循语法：jsx语法   jsx->js和html的混合体
### jsx语法
* jsx是html和js的混合体，（）解析html结构，{}解析js
* 样式：class=>className  style={{}}
* img标签  写alt属性，避免黄色警告
* 组件/标签  必须闭合
* 组件首字母大写
* 事件语法=>小驼峰 例如： onClick
* 注释 {/**/}
### react脚手架创建项目
* 方法一：1.全局下载 create-react-app 插件  2.终端运行 create-react-app 项目名
* 方法二：终端运行 npx create-react-app 项目名  官网推荐
  
### react组件
#### 概念：类似于js函数，用于对页面部分内容（jsx语法）的封装
#### 优势：高复用，低耦合
#### 组件分类：
    * 函数组件 关键字 function 有自己的属性props,无状态  rfc快捷方式生成函数组件
    * 类组件  关键字  class  有自己的属性this.props有自己的状态，可以使用生命周期函数  rcc快捷方式生成类组件
#### 在使用 React 的过程中，不可避免的需要组件间进行消息传递（通信），组件间通信大体有下面几种情况：
    父组件向子组件通信
    子组件向父组件通信
    跨级组件之间通信
    非嵌套组件间通信

### refs属性
* refs 允许访问 DOM 节点
### 使用方式
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
### this.setState()  

https://www.jianshu.com/p/ce39a08b585e

* react组件中修改state状态，
* 语法参考代码
```js
    this.setState({
        list: res.data,
        content: res.data[0].content
    })
```
### mockjs   官网地址：http://mockjs.com/
* 下载mockjs   npm install mockjs -D
* 引入mockjs   const Mock = require('mockjs');
#### 使用mockjs
* 模拟数据   Mock.mock(数据模板)
* 拦截ajax请求，响应数据  Mock.mock(ajax请求地址，响应数据)
### axios
* 下载axios   npm install axios -S
* 引入axios
```js
    // 引入axios
    import axios from 'axios'
```
#### 使用axios  官网：http://www.axios-js.com/
* axios.get(请求地址).then(res=>console.log(res.data))
* axios.post(请求地址，参数).then(res=>console.log(res.data))
```js
    componentDidMount(){
        axios.get('/list').then(res=>{
            console.log(res.data);
            // this.setState({})   // 修改state状态
            this.setState({
                list: res.data,
                content: res.data[0].content
            })
        })
    }
```
### 组件关系
* 嵌套组件 一层嵌套  父子组件   props 回调函数
* 嵌套组件 多层嵌套  context
* 同级组件/无关系组件 redux 嵌套组件
#### 父子组件传参
##### 父组件向子组件传参    props
* 在父组件中的被嵌套组件（子组件）上传递属性，然后在子组件里通过props属性可访问到传递的属性，获取到属性值
```js
    // App.js
    <Son 
    name={this.state.name} 
    data={this.state.list}
    changeName={(user)=>{this.edit(user)}}
    ></Son>
    // Son.js
    this.props
```
##### 子组件向父组件传参    回调函数
* 在父组件中的子组件上定义属性，属性值为函数；在子组件里访问属性值为函数的属性，调用传参
```js
    // Son.js
    <button onClick={()=>{this.props.changeName('张政国')}}>我想换名字</button>
    // App.js
    <Son 
    name={this.state.name} 
    data={this.state.list}
    changeName={(user)=>{this.edit(user)}}
    ></Son>
```
#### demo  改名字
* 父组件定义名字传递给子组件，子组件不满意名字，通知父组件改名字
  
## react组件的生命周期
### 概念：组件创建到销毁的一系列活动（创建/挂载/更新/销毁等）被称为生命周期，在不同的阶段有相应的函数，这些函数被称为生命周期函数
### 按照阶段讲react组件生命周期大致分为三个阶段
#### 创建期
* constructor 构造函数
* componentWillMount 组件挂载前触发的函数
* render 渲染函数
* componentDidMount 组件初次挂载完成触发的函数  常用  常用来发起ajax请求
#### 更新期
* shouldComponentUpdate 组件状态是否更新 返回值return  布尔值  true更新 false不更新
* componentWillUpdate   组件更新前
* componentDidUpdate    组件更新完成
#### 销毁期
* componentWillUnmount  组件销毁前触发  常用 

### 案例  猫眼电影
#### 要求
* 1. 用react脚手架创建项目
* 2. axios请求数据，mockjs拦截请求，响应数据（提供的素材）
* 3. 完成页面渲染，高度还原页面，移动段布局，rem/flex
* 4. 完成tab切换功能
* 5. 实现点击tab头部的高亮效果
* 6. 将电影列表中的每一个电影信息封装成一个组件  Item
* 7. 实现点击电影信息展示电影详情  父子组件传参
  
## 组件的默认属性
* static defaultProps={}
```js
   // 设置默认属性值
    static defaultProps={
        tit:'我是标题'
    } 
```
## 属性类型检测prop-types 
### 用于确保组件接收到的数据类型是有效的
### 局限性：性能考虑，仅在开发模式下使用
### 使用流程
* 下载prop-types npm install prop-types -D
* 引入
```js
    // 引入propTypes
    import PropTypes from 'prop-types'
```
* 使用
```js
    // 属性类型检测
    static propTypes = {
        tit: PropTypes.string
    }
```
## react中组件的this指向
### 改变this指向 call()/apply()  调用直接执行 bind()  需要触发
### 箭头函数  本身不存在this指向 事件源需要手动传递
### 直接bind()绑定 自身携带事件源
### 提前bind()绑定 自身携带事件源
## react组件中的refs属性
### 使用方式
#### 方式一 string
* dom设置  dom节点上设置ref="字符串"    
* 获取dom  this.refs.字符串   
#### 方式二 箭头函数  推荐
* dom设置  dom节点上设置ref={el=>this.node=el}
* 获取dom  this.node
```js
    // html中dom设置
    <input placeholder='我是一个文本输入框' ref={el=>this.dom=el}/>
    // 获取dom
    this.dom
```
## react中使用swiper
### swiper作用=》实现图片轮播效果的插件
### 使用流程
* 下载  npm install swiper -S
* 引入  Swiper对象/样式
```js
    // 引入swiper
    import Swiper from 'swiper'
    import 'swiper/css/swiper.css'
```
* html结构中的三层嵌套
```js
    // html结构
    {/* swiper对应的html结构/三层嵌套 */}
    <div className='swiper-container' ref={el=>this.dom=el}>
        <div className='swiper-wrapper'>
            {/* <div className='swiper-slide'>1</div>
            <div className='swiper-slide'>2</div>
            <div className='swiper-slide'>3</div> */}
            {
                this.state.swiperData.map((item,index)=>{
                    return <div className='swiper-slide' key={index}>
                        <img src={item} alt=""/>
                    </div>
                })
            }
        </div>
        {/* // 分页器 */}
        <div className='swiper-pagination'></div>
    </div> 
```
* 实例Swiper对象
```js
    // 在合适的生命周期中实例化
    componentDidMount(){
        // 实例化  new Swiper(轮播图实例化挂载的dom,配置对象) 
        new Swiper(this.dom,{
            autoplay:true,  // 自动轮播
            loop: true, // 无缝轮播
            pagination:{   // 分页器
                el: '.swiper-pagination'
            }
        })
    }
```

## 受控组件和非受控组件
### 受控组件  表单元素 取值来源于组件的state并结合onChange使其变成受控组件
```js
    state={
        inputValue:''
    }
    render() {
        return (
            <div>
                <input value={this.state.inputValue} onChange={(e)=>{this.setInputVal(e)}}/>
            </div>
        )
    }
    // input 表单元素  value属性（取值来源于组件state）结合onChange使其变成受控组件
    setInputVal(e){
        console.log(e.target.value);   // input的最新value值
        this.setState({
            inputValue:e.target.value
        })
    } 
```
### 思路   input  checkbox  变为受控组件
* 当全选多选框的checked属性变为true,购物车所有商品的多选框为选中状态
* 当全选多选框的checked属性变为false,购物车所有商品的多选框为未选中状态
* 当购物车中所有商品全部选中时，全选的多选框为选中状态否则是未选中状态

## Context
### Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法
### 适用场景：适用于多层嵌套组件传参
### 弊端：使组件的性能变低 (复用率低，代码耦合性高)
### 使用流程
* 1. 在src目录下新建context/index.js=>抛出Provider,Consumer内置组件
```js
    import {createContext} from 'react';
    const Context = createContext();
    // 结构
    const {Provider,Consumer} = Context; 
    // 抛出 Provider传参组件使用Consumer接受参数组件使用   嵌套关系
    export {
        Provider,
        Consumer
    }
```
* 2. 嵌套组件传参  引入 Provider  借助于Provider的value属性传递数据
```js
    // 引入context中的Provider
    import {Provider} from './context/index'
    // Provider将整个组件包裹
    <Provider value={
        {
            name: this.state.initName,
            changeName: this.sayName.bind(this)
        }
    }>
        <div>
            <h1>我是根组件之App组件</h1>
            <One/>
        </div>
    </Provider>
```
* 3. 被嵌套组件接受参数  引入Consumer 借助于回调函数接收参数
```js
    // 引入context中的Consumer
    import {Consumer} from '../context/index'
    // Consumer包裹在最外层，通过回调函数接收参数
     <Consumer>
        {
            (data)=>{
                return <div>
                        <h3>我是嵌套二层的Two组件</h3>
                        <p>我爷爷给我起的名字是{data.name}</p>
                        <button onClick={()=>{data.changeName('王大头')}}>爷爷，我要改名字</button>
                    </div>
            }
        }
    </Consumer>
```
## 组件中children属性
* 指的是组件双标签之间的内容
### children属性组件中的参数不同children属性值数据类型也不同
* 不传参数    children属性值为undefined
* 传一个参数的时候  参数为html结构  children属性值为Object  参数为字符型   children属性值为string
* 传两个/多个参数 children的属性值为Object/Array

## 高阶组件
### 高阶函数是以函数作为参数，并返回函数
```js
    function a(){
        console.log('我是a函数');
    }
    function b(fn){
        fn();
    }
    b(a)   // b函数为高阶函数
```
### 高阶组件是以组件作为参数，返回一个新组件的函数，是 React 中用于复用组件逻辑的一种高级技巧

[React 中的高阶组件及其应用场景](https://blog.csdn.net/weixin_34150830/article/details/88019752)


## 路由
### 概念（路由是什么）
* 随着浏览器地址栏的发生变化，展示给用户不同的页面(视图组件)
### 路由插件  react-router-dom
* react-router-dom   下载命令：npm install react-router-dom -S  --save/-S --save-dev/-D
### 常用的路由内置组件
* BrowserRouter  路由根组件
* Route   路由视图组件
* Switch  避免路由重复匹配  子项只能是Route或者Redirect
* Redirect  路由重定向组件
* Link  跳转组件   无高亮
* NavLink  跳转组件   自带高亮  active

### 路由元信息  一般用路由内置组件Route加载出来的组件携带路由元信息
* history  路由跳转
* match  动态路由传参
* location  路由传参
### 高阶路由  widthRouter 给没有路由元信息的组件添加路由元信息
* 使用方法
* 引入高阶路由
```js
    // 引入高阶路由
    import {withRouter} from 'react-router-dom'
```
* 用高阶路由包裹需要路由元信息的组件使其携带路由元信息
```js
    // 使用
    export default withRouter(Item);
```
### 路由跳转
* 方式一  标签跳转  NavLink/Link
```js
    <NavLink to='/index/home'>首页</NavLink>
```
* 方式二  js跳转   路由元信息  history  this.props.history.push(路由路径)
```js
    this.props.history.push('/detail');
```
### 路由传参 推荐state
##### 方式一 state传参  
```js
    // 跳转传参
    this.props.history.push({    // 路由跳转并传参
        pathname:'/detail',  // 路由路径
        state:{   // 参数
            obj:item
        }
    }) 
    // 获取参数
    this.props.location.state.obj;
```
##### 方式二 query传参
```js
    // 跳转传参
    this.props.history.push({    // 路由跳转并传参
        pathname:'/detail',  // 路由路径
        query:{  // 参数
            obj:item
        }
    })
    // 获取参数
    this.props.location.query.obj;
```
#### state传参和query传参区别
* state传参页面刷新依然可以获取到参数，query传参页面刷新获取不到参数

### 动态路由传参
* 路由路径中配置锚点  形参
```js
    <Route path="/detail/:id" component={Detail}/>
```
* 跳转时动态路由传参   实参
```js
    // 动态路由传参
    this.props.history.push('/detail/'+item.id);
```
* 获取动态路由传参
```js
    // 路由元信息中的match对象获取动态路由传递的参数
    this.props.match.params.id
```
## redux
### redux  状态管理插件
### store中的三个方法
* getState()  获取store数据
* dispatch()  通知store修改
* subscribe()  监听store数据变化

### redux的使用流程
* 1. 下载redux
```js
    npm install redux -S
```
* 2. 定义store共享数据仓库并抛出
```js
    // 1.引入创建store的方法
    import {createStore} from 'redux';
    // 2.定义共享数据对象
    const defaultState={
        title:"渐进式开发"
    }
    // 处理共享数据对象 store
    const reducer=(state=defaultState,action)=>{
        console.log(action);
        // 拷贝
        const newState = JSON.parse(JSON.stringify(state))
        if(action.type==='change_store_title'){   // 修改store中的title
            newState.title="项目整合";
            console.log(newState);
            return newState;
        }
        // 处理共享数据的js逻辑
        return state;
    }
    // 3.创建共享数据仓库  store
    const store = createStore(reducer);
    // 4.抛出store
    export default store;
```
* 3. 外界获取store数据
```js
    // 引入store
    import store from '../store/index';
    store.getState()   // 获取到store共享数据
```
* 4. 外界修改store数据
```js
    // 引入store
    import store from '../store/index';
    store.dispatch(action)  // 通知store做修改
```
* 5. 外界监听store数据变化
```js
    // 引入store
    import store from '../store/index';
    store.subscribe(this.changeState.bind(this))  // 监听store变化  有变化时触发changeState方法
```



# 虚拟DOM和DOM diff算法：

>虚拟dom就是一个描述真实dom的js对象。

```
真实dom：

<div class="box">
    <span>hello world!</span>
</div>

上面这段代码会转换为这样的虚拟DOM结构：

{
    tag: "div",
    props: {
        class: "box"
    },
    children: [{
        tag: "span",
        props: {},
        children: ["hello world!"]
    }]
}

let vSpan = React.createElement('span',null,'hello world')
let vDiv = React.createElement('div',{className:'box'},[vSpan])


ReactDOM.render(vDiv,document.querySelector('#root'))

```

<html>
<!--在这里插入内容-->
    <img src="https://note.youdao.com/yws/public/resource/12c3b4f3d5bcccf233bba409d7864f59/xmlnote/29AC75A4CF1144D7A73BBA4D4742CB95/37845" width="500"/>
    <img src="https://note.youdao.com/yws/public/resource/12c3b4f3d5bcccf233bba409d7864f59/xmlnote/AE1A0C8F869C4C71B00E2C4B021F1A23/37832" width="500"/>
    <h4>diff的过程：不会跨级比较</h4>
    <img src="https://note.youdao.com/yws/public/resource/12c3b4f3d5bcccf233bba409d7864f59/xmlnote/EA95B3341A1D4A629D828EA0CC57B83D/37848" width="500"/>
</html>

    优点：尽量少的操作真实的dom,提高性能。
    
    diff算法：计算哪些需要更新哪些不需要更新,减少dom更新的区域
    
    更新虚拟dom，不会引起页面的dom重绘，最终表现在dom上的修改只是变更的部分，可以保证非常高效的渲染。
    
    参考链接：https://juejin.cn/post/6844904165026562056


## 循环列表需要加key的原因

    参考链接：https://blog.csdn.net/handsomexiaominge/article/details/86560003
    
    我们可以观察一下，打乱顺序后，有无指定key的属性运行结果的异同。相同的是，每一项的input中的value都得到了保留，不同的是，如果我们不指定key属性，列表中组件的标题和input在打乱顺序之后，好像已经对不上号了，那么是什么原因造成的呢？


​    

    我们来简单的了解一下react的diff算法策略，我们都知道，react为了提升渲染性能，在内部维持了一个虚拟dom,当渲染结构有所变化的时候，会在虚拟dom中先用diff算法进行一次对比，将所有的差异化解决之后，再一次性根据虚拟dom的变化，渲染到真实的dom结构中。


​    

    而key属性的使用，则涉及到diff算法中统计节点的对比策略，当我们指定key值时，key值会作为当前组件的id，diff算法会根据这个id来进行匹配。如果遍历新的dom结构时，发现组件的id在旧的dom结构中存在，那么react会认为当前组件只是位置发生了变化，因此不会将旧的组件销毁重新创建，只会改变当前组件的位置，然后再检查组件的属性有没有发生变化，然后选择保留或自改当前组件的属性，因此我们可以发现如果我们制定了唯一的key值，如果只是打乱了数据源，数据源渲染出来的每一个子组件都是整体数据发生变化，而如果不显示制定key值，结果好像出虎我们的意料。
    
    如果没有显示指定key值，会发生什么事情呢？其实，如果没有显示指定，react会把当前组件数据源的index作为默认的key值，name，这时候会发生什么事呢？我们以第二项作为例子，由于我们没有显示指定key值，key值会被默认指定为index，也就是1.当我们打乱了数据的顺序，数据源的第二项由{text:'组件2'，id:'b'}变成了{text：'组件3'，id:c},这时候执行diff算法时，发现key值为1的组件在旧的dom结构中存在，并且组件的位置还是原来的位置，所以，直接保留了原组件，但是组件的标题属性已经改变了，接着，修改组件的属性，渲染，于是，我们就看到了，输入框没改变，但是标题变了，很显然，这个结构，有时候并不是我们的本意。而如果我们现实指定唯一的key值，依旧以第二项作为例子，执行diff算法时，发现第二项的组件变化了并且新的组件在旧的dom结构中存在，于是将第三项整体移动到第二项，然后检查属性有没有发生变化，渲染，最终出现的结果，就是整体的顺序改变了。


​    