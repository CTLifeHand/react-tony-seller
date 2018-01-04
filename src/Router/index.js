import React, { Component } from 'react';
import {
    BrowserRouter,
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';


import Main from '../components/Main'; //销售录入



const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter;

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    {/** 这里可以公共的样式,比如 头部, 尾部, 等. */}
                    {/* header */}
                    {/*结合Switch组件可以匹配到都匹配不到的路劲,404等...*/}
                    <Switch>
                        <Route path='/' exact component={Main} />
                        <Route path='/index' component={Main} />
                        <Redirect to="/" />
                    </Switch>
                    {/* footer */}
                </div>
            </Router>
        );
    }
}


export default App

