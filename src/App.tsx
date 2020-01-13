import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Routes from './routes';
import NavBar from './components/navBar';
export interface AppProps {
  classes;
  match;
  history;
  location;
  navData;//导航菜单数据
}
const styles: any = (theme) => {
  return {
    root:{
      width:'100%',
      height:'100%',
    },
    nav:{
      height:'4rem',
      backgroundColor: '#2C2F33',
      overflow: 'hidden',
      display:'flex',
      justifyContent:'center',
      fontFamily: 'PingFangSC-Regular',
    },
    content:{
      width:'100%',
    }
  }
}
class App extends React.Component<AppProps, any> {
  constructor(props){
    super(props);
  }
  public render() {
    let { match, classes,navData } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.nav}>
          <NavBar navData={navData}/>
        </div>
        <div className={classes.content}>
          <Routes match={match}/>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ app: { navData } }) => ({
  navData,
});
export default withStyles(styles)(connect(mapStateToProps)(withRouter(App)));

