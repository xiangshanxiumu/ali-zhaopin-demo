import * as React from 'react';
import ReactDom from 'react-dom'
import { withStyles } from '@material-ui/styles';
import _ from 'lodash';

interface NewJobsProps {
    classes;
    dataSource; // 滚动数据
    option?; // 滚动配置
}
const styles:any = (theme) => {
    return {
        root: {
            display:'block',
            width: '100%',
            height: '17.5rem',
            overflow: 'hidden',
            position: 'relative',
            overflowY:'scroll',
        },
        scroll: {
            display:'block',
            width: '100%',
            height: 'auto',
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
        let {dataSource} =this.props;
        this.state={
            data:dataSource?_.concat(_.cloneDeep(dataSource),dataSource):null,
            defaultOption:{
                // axis:'Y', // x、Y 运动方向轴
                direction:'up',// 运动方向 up down、//left right
                duration:50,// 运动时间快慢
            }
        }
    }
    timer; // 定时器
    scrollBox; // 滚动父盒子
    scroll;//滚动盒子
    componentDidMount(){
        //option 处理
        this.optionHandle();
        // 获取元素
        this.scroll = document.getElementById('scroll');
        this.scrollBox= document.getElementById('scrollBox');
        this.move();
        // 滚动框宽高
        // const {clientWidth, clientHeight,offsetWidth,offsetHeight,scrollTop} = this.scrollBox;
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    optionHandle = ()=>{
        // 配置合并
        let {defaultOption} = this.state;
        let {option} = this.props;
        if(option){
            let newOption = Object.assign(defaultOption,option);
            // direction
            if(newOption.direction){
                let arr = ['up','down']
                if(!arr.includes(newOption.direction)){
                    newOption.direction='up';
                }
            }
            //duration
            if(newOption.duration){
                newOption.duration = Number(newOption.duration);
                if(isNaN(newOption.duration)){
                    newOption.duration=50;
                }
            }
            this.setState({
                defaultOption:newOption,
            })
        }
    }
    move=()=>{
        let {defaultOption} = this.state;
        clearInterval(this.timer);
        this.timer=setInterval(()=>{
            if(defaultOption.direction=='up'){
                // this.scroll.offsetHeight - this.scrollBox.clientHeight
                if(this.scrollBox.scrollTop>=this.scroll.offsetHeight/2){
                    this.scrollBox.scrollTop = 0;
                } else{
                    this.scrollBox.scrollTop += 2;
                }
            } else if(defaultOption.direction=='down'){
                if(this.scrollBox.scrollTop == 0){
                    // this.scroll.offsetHeight - this.scrollBox.clientHeight
                    this.scrollBox.scrollTop = this.scroll.offsetHeight/2;
                } else{
                    this.scrollBox.scrollTop -= 2;
                }
            }
        },defaultOption.duration)
    }
    mouseEnterHandle(){
        clearInterval(this.timer);
    }
    mouseLeaveHandle(){
        this.move();
    }
    public render() {
        let { classes } = this.props
        let {data} = this.state;
        console.log(data)
        return (
            <div className={classes.root} id="scrollBox" ref='scrollBox'
              onMouseEnter={this.mouseEnterHandle.bind(this)}
              onMouseLeave={this.mouseLeaveHandle.bind(this)}>
                <ul className={classes.scroll} id="scroll" ref='scroll'>
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