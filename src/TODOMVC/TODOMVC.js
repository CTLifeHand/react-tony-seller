import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../Redux/todoAppActions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

class App extends Component {
    render() {
        // Injected by connect() call:
        const { dispatch, visibleTodos, visibilityFilter } = this.props
        return (
            <div>
                <AddTodo
                    onAddClick={text =>
                        dispatch(addTodo(text))
                    } />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={index =>
                        dispatch(completeTodo(index))
                    } />
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={nextFilter =>
                        dispatch(setVisibilityFilter(nextFilter))
                    } />
            </div>
        )
    }
}

App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
        default:
            return todos
    }
}


/* 

以 todo 应用为例，需要保存两种不同的数据：

当前选中的任务过滤条件；
完整的任务列表。
通常，这个 state 树还需要存放其它一些数据，以及一些 UI 相关的 state。这样做没问题，但尽量把这些数据与 UI 相关的 state 分开。

这个就是单一的状态树 (我们的应用不可能有单一状态树 因为太多状态)
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}

*/
// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}

/* react-redux 提供的 connect() 帮助器来调用 */
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
/* 
// before
export default connect(mapStateToProps)(Something)

// after
import { withRouter } from 'react-router-dom'
export default withRouter(connect(mapStateToProps)(Something)) 
*/
export default connect(select)(App)