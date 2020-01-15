import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import SearchBar from '../../components/searchBar';
import Footer from '../../components/footer';
import NewJobs from './newJobs';
import _ from 'lodash';
import store from 'store';
// import './index.scss'
interface HomeProps {
  match: any;
  classes;
  hotSearch; //热门搜索
  newJobs; // 最新职位
}
const styles: any = (theme) => {
  return {
    root: {
      width: '100%',
      height: '100%',
      position: 'relative',

    },
    content: {
      width: '100%',
      height: '100%',
      // display:'flex',
      // flexDirection:'column',
      paddingBottom: '4rem',
    },
    topBox: {
      position: 'relative',
      height: '35rem',
      overflow: 'hidden',
      '& img': {
        width: '100%',
        verticalAlign: 'middle',
      }
    },
    mask: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(31,56,88,0.40)',
    },
    middleBox: {
      width: '50%', // 50%
      height: '100%',
      position: 'absolute',
      left: '50%',
      top: 0,
      transform: 'translateX(-50%)',
      color:'#fff',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      '&>div':{
        minWidth:'50%',
        height:'60%',
        '& p':{
          fontFamily: 'Rufina-Bold',
          fontSize: '6rem',
          fontWeight:'bolder',
          color: '#fff',
          height:'4.5rem',
          lineHeight: '4.5rem',
          marginBottom:'0px',
        },
      }
    },
    zhText:{
      fontFamily: 'PingFangSC-Thin !important',
      fontSize: '4rem !important',
      fontWeight: 'normal !important',
      marginBottom:'2rem !important',
    },
    // 热门搜索
    hotSearchBox:{
      color: 'rgba(255,255,255,0.80)',
      padding:'1rem 0rem',
      '& a':{
        color: 'rgba(255,255,255,0.80)',
        paddingLeft: '1rem',
      },
      '& a:hover':{
        color: '#F37327',
      }
    },
    bottomBox: {
      width:'55%',
      margin:'0 auto',
      marginTop:'2rem',
      display:'flex',
    },
    left: {
      flex:1,
      paddingTop:'4rem',
      background: '#FFFFFF',
      boxShadow: '0 0 15px 0 rgba(31,56,88,0.08)',
      borderRadius: '3px',
      position: 'relative',
    },
    more:{
      position:'absolute',
      left:0,
      top:0,
      width:'100%',
      height:'4rem',
      padding:'0rem 1rem',
      borderBottom:'1px solid rgba(31,56,88,0.06)',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      fontSize:'1.2rem',
      color:'#000',
      '& a':{
        color: 'rgba(31,56,88,0.60)',
        textDecoration: 'none',
      }
    },
    right: {
      fontFamily: 'PingFangSC-Regular',
      marginLeft:'1.5rem',
      '& a': {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        width: '22rem',
        height: '10rem',
        cursor: 'pointer',
        background: '#FFFFFF',
        boxShadow: '0 0 15px 0 rgba(31,56,88,0.08)',
        borderRadius: '3px',
        '& img':{
          width:'50%',
          verticalAlign: 'middle',
        }
      },
      '&>a:first-child':{
        marginBottom:'1.5rem'
      },
      '&>a:last-child':{
        '& img':{
          width:'80%',
        }
      }
    },
    footer: {
      position: 'fixed',
      bottom: '0rem',
      width: '100%'
    }
  };
};
class Home extends React.Component<HomeProps, any> {
  constructor(props){
    super(props);
    this.state={
      searchValue:""
    }
  }
  // 热门搜索 点击 事件 事件委托
  hotSearchClick = (e) =>{
    this.setState({
      searchValue:e.target.innerText
    },()=>{
      store.set('searchValue',e.target.innerText)
    })
    // 路由跳转 history.push('xxx)
    location.href = "https://job.alibaba.com/zhaopin/positionList.htm?";
  }
  AClick =(e)=>{
    e.preventDefault();
  }
  public render() {
    let { classes,hotSearch,newJobs } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.topBox}>
            <img src='/assets/images/home_bg.png' />
            <div className={classes.mask}></div>
            <div className={classes.middleBox}>
              <div>
                <p>If&thinsp;not&thinsp;now,when?</p>
                <p>If&thinsp;not&thinsp;me,who?</p>
                <p className={classes.zhText}>此时此刻，非我莫属!</p>
                <SearchBar/>
                <div className={classes.hotSearchBox} onClick={this.hotSearchClick}>
                  热门搜索 : 
                  {
                    _.map(hotSearch,(item,index)=>{
                    return <a 
                    key={index}
                    onClick={this.AClick.bind(this)}>{item.name}</a>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <div className={classes.bottomBox}>
            <div className={classes.left}>
              <div className={classes.more}>
                <span>最新职位</span>
                <a href="https://job.alibaba.com/zhaopin/positionList.html?">更多</a>
              </div>
              {/*无缝滚动最新职位信息*/}
              <NewJobs dataSource={newJobs}/>
            </div>
            <div className={classes.right}>
              <a href="https://www.aliyun.com/careers">
                <img src='/assets/images/ali_yun.png'/>
              </a>
              <a href="https://job.alibaba.com/zhaopin/informationPlatformBu.htm?">
                <img src='/assets/images/ali_ai.svg'/>
              </a>
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ home: { hotSearch,newJobs } }) => ({
  hotSearch,
  newJobs,
});
export default withStyles(styles)(connect(mapStateToProps)(Home))