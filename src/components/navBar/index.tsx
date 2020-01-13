import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classnames from 'classnames';
import _ from 'lodash';
interface NavBarProps {
    classes;
    navData;//导航菜单数据
}
const styles = (theme) => {
    return {
        root: {
            height: '100%',
            minWidth:'50%',
            display: 'flex',
        },
        leftBox: {
            height: '100%',
            display: 'flex',
            alignItems: 'streth',
            color: 'white',
            fontStyle: 'normal',
            '&>div:first-child': {
                width: '10rem',
                display: 'flex',
                alignItems: 'center',
                '& a': {
                    width: '100%',
                    '& img': {
                        width: '100%',
                        height: 'auto'
                    }
                }
            },
            '&>div:last-child': {
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.5rem',
                opacity: 0.8,
            }
        },
        getter: {
            fontSize: '2rem',
            margin: '0rem 1rem',
            display: 'flex',
            alignItems: 'center',
            opacity: 0.8,
        },
        rightBox: {
            display: 'flex',
            '& li': {
                display: 'flex',
                alignItems: 'center',
                '& a': {
                    display: 'flex',
                    padding:'0.8rem 1.5rem',
                    marginLeft:'0.25rem',
                    color: 'white',
                    fontSize: '1.5rem',
                    opacity: 0.8,
                },
                '& a:hover':{
                    color: '#F37327',
                    opacity: 1,
                }
            }
        },
        active:{
            color: '#F37327 !important',
            opacity: '1 !important',
        }
    }
}

class NavBar extends React.Component<NavBarProps, any> {
    constructor(props) {
        super(props);
        this.state={
            activeIndex:0, // 默认选中第一项
        }
    }
    // nav 点击事件
    navClick= (index,item)=>{
        this.setState({
            activeIndex:index
        })
    }
    public render() {
        let { classes, navData } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.leftBox}>
                    <div>
                        <a href="/">
                            <img src="../../assets/images/logo.png" />
                        </a>
                    </div>
                    <div className={classes.getter}>|</div>
                    <div>社招官网</div>
                </div>
                <div className={classes.rightBox}>
                    {_.map(navData, (item, index) => {
                        if (item.title == "首页") {
                            return <li key={index}>
                                <a href={item.href} className={index==this.state.activeIndex?classes.active:null} onClick={this.navClick.bind(this,index,item)}>首&nbsp;&nbsp;&nbsp;&nbsp;页</a>
                            </li>
                        } else {
                            return <li key={index}>
                                <a href={item.href} className={index==this.state.activeIndex?classes.active:null} onClick={this.navClick.bind(this,index,item)}>{item.title}</a>
                            </li>
                        }
                    })}
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(NavBar);