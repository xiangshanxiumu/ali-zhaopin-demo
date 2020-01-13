import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import _ from 'lodash';
import { Input,Button } from 'antd';
import store from 'store';
const { Search } = Input;

interface SearchBarProps{
    classes;
}
const styles:any = (theme)=>{
    return {
        root:{
            position: 'relative',
            boxSizing: 'border-box',
            display:'flex',
            '& input':{
                height:'3rem',
                borderRadius: '3px',
                margin:'1rem 0rem 1rem 1rem',
                boxSizing: 'border-box',
            },
            '& button':{
                width:'20%',
                height:'3rem',
                margin:'1rem',
                borderRadius: '3px',
                borderColor: '#F37327',
                fontFamily: 'PingFangSC-Regular',
                color: '#fff',
                background: '#F37327',
                boxSizing: 'border-box',
            },
            '& button:hover':{
                borderColor: 'rgba(243, 115, 39, 0.8)',
                background: 'rgba(243, 115, 39, 0.9)', 
            },
            '& button:focus':{
                borderColor: 'rgba(243, 115, 39, 0.7)',
                background: 'rgba(243, 115, 39, 0.8)',  
            }
        },
        mask:{
            width: '100%',
            height: '100%',
            background: '#fff',
            position: 'absolute',
            opacity: 0.1,
        }
    }
}
class SearchBar extends React.Component<SearchBarProps,any>{
    constructor(props){
        super(props)
        this.state={
            searchValue:"",//搜索内容
        }
    }
    // 输入框内容改变事件
    inputChange = (e) =>{
        if(e && e.target){
            this.setState({
                searchValue:e.target.value
            })
        }
    }
    // 按钮点击事件
    buttonClick=()=>{
        let {searchValue} = this.state;
        if(searchValue){
            store.set('searchValue',searchValue)
        }
        // 路由跳转 history.push('xxx)
        location.href = "https://job.alibaba.com/zhaopin/positionList.htm?";
    }
    public render(){
        let {classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.mask}></div>
                 <Input placeholder="请输入职位关键词" onChange={this.inputChange}/>
                 <Button type="primary" onClick={this.buttonClick.bind(this)}>搜索</Button>
            </div>
        )
    }
}
export default withStyles(styles)(SearchBar)