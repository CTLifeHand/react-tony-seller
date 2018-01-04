import React, {Component} from 'react';
// import pureRender from 'pure-render-decorator';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';



export default (mySeting) => {
    let seting = {
        id: '', //应用唯一id表示
        url: '', //请求地址
        data: {}, //发送给服务器的数据
        component: <div></div>, //数据回调给的组件
    };

    for (let key in mySeting) {
        seting[key] = mySeting[key];
    }

    class Index extends Component {
        static defaultProps = { seting }

        render() {
            return <this.props.seting.component {...this.props} state={this.props.state&&this.props.state.toJS()}/>;
        }

        componentDidMount() {//获取数据
            if (this.props.seting.url) {
                this.props.fetchPosts(this.props.seting.url,this.props.seting.data);
            }
        }

        componentWillReceiveProps(nextProps) {
            
        }

        shouldComponentUpdate(nextProps, nextState) {
            if (nextProps.state.get('isFetching')) {
                return false
            }
            return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
        }
    }
    //mapStateToProps and mapDispatchToProps
    return Index;
}


