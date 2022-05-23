下包步骤

npx create-react-app 项目名称 --typescript

npx create-react-app 项目名称 --template typescript

react-router-dom @types/react-router-dom

react-redux @types/react-redux

redux

react-dom

axios @types/axios

react-thunk

node-sass

postcss-pxtorem  (npm i -D postcss-pxtorem , 下完包以后需要进行配置)  







router 放路由

store 放共享的数据

static 静态资源文件

utils 共用文件

types 接口

views 放视图组件，有的公司是pages，不同的公司可能名字不一样

component 放公共组件





## 合并reducer

```js
import {createStore, combineReducer} from 'redux';
import votrReducer from './reducer/vode';
let reducer = combineReducer({
    vote: votrReducer
})

let store = createStore(reducer);
export default store;
```

### 引入

```js
// 因为vote的reducer命名是vote，所以用vote找
let mapStateToProps = (state:any) => {
    return {
        list: state.vote.votelist,
        name: state.vote.name,
    }
}
```

一般用到数组或对象给仓库里面的数据赋值的时候，都要解构赋值一下

```js
switch (action.type) {
    case SET_VOTELIST:{
        state.votelist = [...action.list];
        return {...state}
    }
    //投票
    case SELECTED:{
        //1.投票 id 2.选项optionId   3.谁投的票  4.票数加1
        let votelist = state.votelist.map(item => {
            if(item.id == action.id){
                if(item.selected != -1){
                    alert("您已投过票")
                }else{
                    //找到目标投票
                    item.selected = action.optionId;
                    item.voteusers.push(action.name);
                    // 不是直接把map的值赋值给item.options，而是先赋值给一个变量，然后解构赋值
                    let options = item.options.map(v => {
                        if(v.id == action.optionId){
                            v.num++;
                        }
                        return {...v}
                    })
                    item.options = [...options];
                    item.size++;
                }
            }
            // 也不是直接返回item，最好解构赋值一下
            return {...item}
        })
        // 最后返回的state对象，上面有一个votelist属性，
        return {votelist:[...votelist]}
    }
    default:
        // 默认值直接返回state
        return state;
}
```

```js

componentDidMount() {
    this.props.setVote();
}

let getVoteList = () => {
    return (dispatch:any) => {
        axios.get('/api/votelist').then(res => {
            dispatch({type: 'SET_VOTELIST', 						list: 					res.data.data})
        })
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setVote() {
            // 测试一下，到底用哪种方法
            // getVoteList()(dispatch)
            // dispatch(getVoteList()(dispatch))
            dispatch(getVoteList()(dispatch))
        }
    }
}
```

## 封装action异步操作

## 把全部action放到一个文件里面

```ts
// store/actions/votelist
export const getVoteList = () => {
    return (dispatch: any) => {
        axios.get('/api/votelist').then(res => {
            dispatch({type: 'SET_VOTELIST', list: res.data.tate})
        })
    }
}

export const selectd = (id: number, optionId: number, name: stirng) => {
    return {
        type: 'SELECTED',
        id,
        optionId,
        name
    }
}
```



## 使用

```ts
import * as VoteActions from '../../store/actions/votelist';
// 如果不想用*号，用以下这种方式引用
// import {addComment} from '../../store/actions/detail';
// import {getDetail,addLove} from '../../store/actions/detail';

import {bindActionCreators} from 'redux';

import {RouteComponentProps} from 'react-router-dom';
import {CommentProp} from '../../types/list.d';
// Iprops 上面的类型可能是store传过来的，也可能是父组件传过来的
interface Iprops extends RouteComponentProps{
    // 需要传参数的action，规范一下参数的类型
    addVote: (target: OptionsProps) => void
    addComment:(comment:CommentProp) => void
}

interface Istates{
    user: string,
    pwd: string,
    [props: stirng]: string
}
    
class Vote extends Component<Iprops, Istates> {
    publich = () => {
        this.props.addComment({
            id: new Date().getTime(),
            time: new Date() + '',
            con: this.state.con
        })
    }
}

const MapDispatchToProps = (dispatch:any) => {
    return bindActionCreators(VoteActions, dispatch)
    // 返回的时候用以下这种方法
    // return bindActionCreators({addComment},dispatch)
    // return bindActionCreators({getDetail,addLove},dispatch)
}
```



## 从路由解构id或者item的时候，可能报错

```js
this.props.history.push(`/detail/${item.id}`, {item})
```

```tsx
// 详情页
import {RouteComponentProps} from 'react-router-dom';

interface Iprops extends RouteComponentProps{
    location: any,
    match: any
}

export default class Detail extends Component<Iprops>{
    render() {
        let {item} = this.props.location.state;
        return (
        	<div>
                <img src={item.img} />
                <p>{item.title}</p>
            </div>
        )
    }
}
```



### 合并reducer

```js
import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import voteReducer from './reducer/vode';

let reducer = combineReducers({
    vote: voteReducer,
})

let store = createStore(reducer, applyMiddleware(thunk));
export default store;
```

### 引入

```jsx
let mapStateToProps = (state:any) => {
    return {
        list: state.vote.votelist,
        name: state.vote.name,
    }
}
```

### 函数和class引入泛型的方式

```ts
interface Iprops extends RouteComponentProps{}

interface Istate{
    username:string,
    password:string,
    [propname:string]:any
}
class login extends Component<Iprops,Istate>{
    state = {
        username:'',
        password:''
    }
}

const RouterView:React.FC<Iprops> = function({routes}){
    let routeArr = routes.filter(item => item.component);
    let redireactArr = routes.filter(item => item.redirect);  
}



export default function RouterView({routes}:RouterProps) {
    // 获取非重定向路由
    let list = routes.filter(item => !item.redirect);

    // 获取重定向路由
    let redirect = routes.filter(item => item.redirect)[0];
}
```

#### 如果是封装router

##### 在router文件夹里面新建一个index.tsx

```tsx
import React from 'react';

import {BrowserRouter} from 'react-router-dom';

import ReactView from './router-views';

import routerConfig from './router.config';

let Router:React.FC = function (){
    return <BrowserRouter>
        <ReactView routes={routerConfig}></ReactView>
    </BrowserRouter>
}

export default Router
```

##### 在App.tsx里面

```tsx
import React from 'react';
import './App.css';
import Router from './router/';
import store from './store/index';
import {Provider} from 'react-redux';

export default () => <Provider store={store}><Router></Router></Provider>
// 或者
// const App:React.FC = () => <Provider store={store}><Router></Router></Provider>

// export default App
```

##### 在index.tsx里面

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

```

#### 组件或者函数的引用都是来自哪个包

```js
import {Provider} from 'react-redux';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';

// (e.target as HTMLInputElement).value
// HTMLInputElement  //不需要引入，直接用
// (this.box as HTMLDivElement).children[index]
import thunk from 'redux-thunk';

```

#### mock的传参

```js
Mock.mock('/api/classify','get',() => {
    return classify
})

Mock.mock('/api/classify','get',req => {
    let data = json.parse(req.body)
    return classify
})

Mock.mock('/api/list',(req:any) => {
    console.log(req)
    let {id} = JSON.parse(req.body);

    let target = list.filter(item => item.parent == id);
    return target
})
//获取详情
Mock.mock('/api/detail',(req:any) => {
    let {id} = JSON.parse(req.body);
    let detail = list.find(item => item.id == id);
    return detail
})
```

#### 在state上面额外添加属性

```tsx
interface Istate{
    classify:ClassifyProp[]  
}
// Istate上面只规定了一个属性，可是后面新加的滚动，和dom元素，都没有在Istate上面规范，就放到了下面
export default class App extends React.Component<{},Istate>{
    state = {
        classify:[]
    }
    scroll: any;
    box: HTMLDivElement | null| undefined;

    componentDidMount(){

        //选中DOM中定义的 .wrapper 进行初始化
        this.scroll = new BScroll('.right', {
            click: true,  // better-scroll 默认会阻止浏览器的原生 click 事件
            scrollY: true, //关闭竖向滚动
        })
        
        axios.get('/api/types',{data:{id:1}}).then(res => {
            this.setState({
                classify:res.data
            },() => {
                this.scroll.refresh()
            })
        })
       
    }
    
    scrollTo = (index:number) => {
        this.scroll.scrollToElement((this.box as HTMLDivElement).children[index],0,0,0)
    }
}

```



####  Context {provider consumer}

```js
// util/context.js
import React, {createContext} from 'react';

// 如果用ts写的话，默认参数必须写，不写的话会报错，会显示：默认值是unknown
let context = createContext({});

export default context;
```

```jsx
// Menu.tsx
import context from '../../util/context';

render() {
    let {defaultSelectedKeys, defaultOpenKeys} = this.props;
    return (
        // 用Provider传多个值的话，传入一个对象，一个值就直接写
    	<context.Provider value={{defaultSelectedKeys, defaultOpenKeys}}>
            <div>
            	{this.props.children}
            </div>
        </context.Provider>
    )
}
```

```tsx
// SubMenu
import context from '../../util/context'

render() {
    <context.Consumer>
        // 因为从Provider传过来的是一个对象，所以value就是一个对象，里面有两个属性
        // value 的 类型规范为any
        {(value: any) => {
            let index = value.defaultOpenKeys.findIndex(item => item === this.props.keyId)
            
            // 这种写法是错误的，不能在render里面调用this.setState
            this.setState({
                visible: index != 1
            })
            return (
            	<div>
                    <div onclick={this.changeOpen}>
                        {this.props.title}
                    </div>
                    <div style={{display: visible ? 'block' : 'none'}}>
                        {this.props.children}
                    </div>
                </div>
            )
        }}
    </context.Consumer>
}
```



#### EventBus

是一对多的关系，同一个事件名可能会触发很多方法

```tsx
// util/eventbus.ts
export interface EventProp{
    [propName: string]: any
}

class EventBus{
    events: EventProp;
	constructor() {
        this.events = {}
    }

    // 同一个事件名可能会执行多个
	$on(eventName: string, callback: any){
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }
        
        this.events[eventName].push(callback)
    }
	// params 这个变量，自身就是一个数组，是存放除了事件名之外，所有参数的数组
	$emit(eventName: string,...params:any[]){
         this.events[eventName].forEach(fun => {
             fun(...params)
         })
    }
}
```





# react + ts 一些设置类型的方法

```js

let scrollBox = useRef<HTMLDivElement>(null)



import {FC} from 'react'

const LazyImage:FC<Iprops> = function(props) {

}



let clientHeight = scrollBox.current?.clientHeight

问号代表scrollBox.current 的值可能为null



另一种方法let clientHeight = （scrollBox.current as HTMLDivElement).clientHeight

```

