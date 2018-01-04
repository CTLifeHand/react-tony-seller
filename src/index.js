import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Demo (https://doc.react-china.org/tutorial/tutorial.html)
import Game from './Game/Game.js'
import './Game/Game.css';

// todoMVC (http://www.redux.org.cn/docs/basics/Actions.html)
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import TODOMVC from './TODOMVC/TODOMVC'
import todoApp from './Redux/todoAppReducers'
// VisibilityFilters是一个常量
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './Redux/todoAppActions'

// https://github.com/bailicangdu/react-pxq.git
import SellerApp from './Router'; //路由配置
import store from './Redux/store';
import { withRouter } from 'react-router-dom'

import * as action from './Redux/action';

import './config';//引入默认配置

import './style/common.scss';
import './style/head.scss';
import './style/index.scss';
import './style/chooseProducts.scss';
import './style/helpCenter.less';
import './style/saleRecord.less';
import './style/allDeposit.less';
import './style/applyDeposit.less';
import './style/applyRecord.less';


// todoApp是一个函数来的
let todoAppStore = createStore(todoApp)

// 打印初始状态
/* 
严格的单向数据流是 Redux 架构的设计核心。

Redux 应用中数据的生命周期遵循下面 4 个步骤：

1.调用 store.dispatch(action)。

Action 就是一个描述“发生了什么”的普通对象。比如：

 { type: 'LIKE_ARTICLE', articleId: 42 };
 { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } };
 { type: 'ADD_TODO', text: 'Read the Redux docs.'};
可以把 action 理解成新闻的摘要。如 “玛丽喜欢42号文章。” 或者 “任务列表里添加了'学习 Redux 文档'”。

你可以在任何地方调用 store.dispatch(action)，包括组件中、XHR 回调中、甚至定时器中。

2.Redux store 调用传入的 reducer 函数。

Store 会把两个参数传入 reducer： 当前的 state 树和 action。例如，在这个 todo 应用中，根 reducer 可能接收这样的数据：

 // 当前应用的 state（todos 列表和选中的过滤器）
 let previousState = {
   visibleTodoFilter: 'SHOW_ALL',
   todos: [
     {
       text: 'Read the docs.',
       complete: false
     }
   ]
 }

 // 将要执行的 action（添加一个 todo）
 let action = {
   type: 'ADD_TODO',
   text: 'Understand the flow.'
 }

 // render 返回处理后的应用状态
 let nextState = todoApp(previousState, action);
注意 reducer 是纯函数。它仅仅用于计算下一个 state。它应该是完全可预测的：多次传入相同的输入必须产生相同的输出。它不应做有副作用的操作，如 API 调用或路由跳转。这些应该在 dispatch action 前发生。

3.根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。

根 reducer 的结构完全由你决定。Redux 原生提供combineReducers()辅助函数，来把根 reducer 拆分成多个函数，用于分别处理 state 树的一个分支。

下面演示 combineReducers() 如何使用。假如你有两个 reducer：一个是 todo 列表，另一个是当前选择的过滤器设置：

 function todos(state = [], action) {
   // 省略处理逻辑...
   return nextState;
 }

 function visibleTodoFilter(state = 'SHOW_ALL', action) {
   // 省略处理逻辑...
   return nextState;
 }

 let todoApp = combineReducers({
   todos,
   visibleTodoFilter
 })
当你触发 action 后，combineReducers 返回的 todoApp 会负责调用两个 reducer：

 let nextTodos = todos(state.todos, action);
 let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action);
然后会把两个结果集合并成一个 state 树：

 return {
   todos: nextTodos,
   visibleTodoFilter: nextVisibleTodoFilter
 };
虽然 combineReducers() 是一个很方便的辅助工具，你也可以选择不用；你可以自行实现自己的根 reducer！

4.Redux store 保存了根 reducer 返回的完整 state 树。

这个新的树就是应用的下一个 state！所有订阅 store.subscribe(listener) 的监听器都将被调用；监听器里可以调用 store.getState() 获得当前 state。

现在，可以应用新的 state 来更新 UI。如果你使用了 React Redux 这类的绑定库，这时就应该调用 component.setState(newState) 来更新。

*/
console.log(todoAppStore.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = todoAppStore.subscribe(() =>
    console.log(todoAppStore.getState())
)


// 发起一系列 action (这段代码放在前面也可以)
todoAppStore.dispatch(addTodo('Learn about actions'))
todoAppStore.dispatch(addTodo('Learn about reducers'))
todoAppStore.dispatch(addTodo('Learn about store'))
todoAppStore.dispatch(completeTodo(0))
todoAppStore.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL))

// 停止监听 state 更新
unsubscribe();

// Create React App
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// Game
ReactDOM.render(<Game />, document.getElementById('root'));
/* // TODOMVCT 
http://www.redux.org.cn/docs/basics/ExampleTodoList.html 
*/
ReactDOM.render(
    <Provider store={todoAppStore}>
        <TODOMVC />
    </Provider>,
    document.getElementById('root')
);

withRouter(connect(state => { //将顶层组件与模版绑定后return回去，配置路由的时候用的就是和redux绑定的组件，所以其实每个路由匹配的都是同一个组件，只不过这个组件的内容不同
  let { producRecord, saleRecord, requestData, testData } = state;
  return {
    state: state['fetchData'],
    producRecord,
    saleRecord,
    requestData,
  }
}), action)(SellerApp)

ReactDOM.render(
    <Provider store={store}>
      <SellerApp />
    </Provider>,
    document.getElementById('root')
);


/* react-redux 提供的 connect() 帮助器来调用 */
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
/* 
// before
export default connect(mapStateToProps)(Something)

// after
import { withRouter } from 'react-router-dom'
export default withRouter(connect(mapStateToProps)(Something)) 
*/

