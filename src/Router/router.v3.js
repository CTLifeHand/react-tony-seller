import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Router, Route, Redirect, Switch, browserHistory, hashHistory } from 'react-router';
import { Route, Redirect, Switch } from 'react-router';
import { BrowserRouter, HashRouter } from 'react-router-dom'

import Main from '../components/Main'; //销售录入

/* 4.0不再支持嵌套了 */
class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

/* 官方推荐使用browserHistory 已经修改为BrowserRouter

使用hashHistory,浏览器的url是这样的：/#/user/liuna?_k=adseis

使用browserHistory,浏览器的url是这样的：/user/liuna

这样看起来当然是browerHistory更好一些，但是它需要server端支持。

使用hashHistory时，因为有 # 的存在，浏览器不会发送request,react-router 自己根据 url 去 render 相应的模块。

使用browserHistory时，从 / 到 /user/liuna, 浏览器会向server发送request，所以server要做特殊请求，比如用的 express 的话，你需要 handle 所有的路由 app.get('*', (req, res) => { ... })，使用了 nginx 的话，nginx也要做相应的配置。

如果只是静态页面，就不需要用browserHistory,直接hashHistory就好了。 */
const Router = process.env.NODE_ENV !== 'production' ? HashRouter : BrowserRouter;


// const chooseProducts = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('../components/chooseProducts').default)
//     }, 'chooseProducts')
// }

// const helpCenter = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('../components/helpCenter').default)
//     }, 'helpCenter')
// }

// const saleRecord = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('../components/saleRecord').default)
//     }, 'saleRecord')
// }

// const allDeposit = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('../components/allDeposit').default)
//     }, 'allDeposit')
// }

// const applyRecord = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('../components/applyRecord').default)
//     }, 'applyRecord')
// }

// const applyDeposit = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('../components/applyDeposit').default)
//     }, 'applyDeposit')
// }

const RouteConfig = (
    <HashRouter>
        <div>
            <Switch>
                <Route path="/" exact component={Main} />{/* //首页 */}
                <Route path="/index" component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    </HashRouter>
);




export default RouteConfig;


