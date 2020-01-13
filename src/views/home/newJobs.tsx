import * as React from 'react';
import ReactDom from 'react-dom'
import { withStyles } from '@material-ui/styles';
import _ from 'lodash';

interface NewJobsProps {
    classes;
    data; // 数据
    option?; // 配置
}
const styles:any = (theme) => {
    return {
        root: {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
        },
        scrollBox: {
            width: '100%',
            height: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            padding:'0rem'
        },
        rowItem: {
            height:'3.5rem',
            padding:'0rem 1rem',
            display:'flex',
            alignItems:'center',
            fontSize:'1.2rem',
            '& a':{
                width:'60%',
                color:'#3C99D8',
                overflow:'hidden',
                textOverflow:'ellipsis',
                whiteSpace:'nowrap',
            },
        },
        address:{
            width:'30%',
                color:'rgba(31,56,88,0.6)',
                overflow:'hidden',
                textOverflow:'ellipsis',
                whiteSpace:'nowrap',
        },
        time:{
            width:'10%',
            color:'rgba(0,0,0,0.6)',
            overflow:'hidden',
            textOverflow:'ellipsis',
            whiteSpace:'nowrap',
            textAlign:'right',
        }
    }
}

class NewJobs extends React.Component<NewJobsProps, any>{
    constructor(props){
        super(props);
        this.state={
            option:{
                axis:'Y', // x、Y 运动方向轴
                direction:'',// 运动方向
            }
        }
    }
    timer; // 定时器
    scrollBox; // 滚动盒子
    componentDidMount(){
        // 滚动框宽高
        const {clientWidth, clientHeight,offsetWidth,offsetHeight} = this.scrollBox;
        console.log(clientWidth, clientHeight,offsetWidth,offsetHeight)
        let {left,top,right,bottom} = this.scrollBox.getBoundingClientRect(); // 相对浏览器左上角位置
        console.log(left,top,right,bottom)
    }
    move=(axis)=>{

    }
    public render() {
        let { classes, data } = this.props
        return (
            <div className={classes.root}>
                <ul className={classes.scrollBox} ref={(ref)=>{this.scrollBox = ref}}>
                    {_.map(data, (item, index) => {
                        return <li className={classes.rowItem} key={index}>
                            <a href={item.href}>{item.title}</a>
                            <span className={classes.address}>{item.address}</span>
                            <span className={classes.time}>{item.time}</span>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}

export default withStyles(styles)(NewJobs)