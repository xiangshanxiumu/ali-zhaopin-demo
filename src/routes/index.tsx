import { withStyles } from '@material-ui/styles';
import * as React from 'react';
import loadable from 'react-loadable';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoadingComponent from '../components/loading';
interface RoutesProps {
  match: any;
  classes;
}
const styles = (theme) => {
  return {
    root: {
      width:'100%',
      height:'100%'
    }
  };
};
// 首页home
let Home = loadable({
  loader: () => import(/* webpackChunkName: "home" */ '../views/home'),
  loading: LoadingComponent
});
// 社会招聘socialRecruitment
let SocialRecruitment = loadable({
    loader: () => import(/* webpackChunkName: "socialRecruitment" */ '../views/socialRecruitment'),
    loading: LoadingComponent
});
// 校园招聘campusRecruitmentt
let CampusRecruitment = loadable({
    loader: () => import(/* webpackChunkName: "campusRecruitment" */ '../views/campusRecruitment'),
    loading: LoadingComponent
});
// 了解阿里aboutAli
let AboutAli = loadable({
    loader: () => import(/* webpackChunkName: "aboutAli" */ '../views/AboutAli'),
    loading: LoadingComponent
});
// 个人中心 personalCenter
let PersonalCenter = loadable({
    loader: () => import(/* webpackChunkName: "personalCenter" */ '../views/PersonalCenter'),
    loading: LoadingComponent
});
const Routes: React.FunctionComponent<RoutesProps> = ({ match, classes }) => {
  return (
    <div className={classes.root}>
      <Switch>
        {/* <Redirect exact from={`${match.url}/`} to={`${match.url}login`} /> */}
        <Route path={`${match.url}/`} component={Home} />
        <Route path={`${match.url}/socialRecruitment`} component={SocialRecruitment} />
        <Route path={`${match.url}/campusRecruitment`} component={CampusRecruitment} />
        <Route path={`${match.url}/aboutAli`} component={AboutAli} />
        <Route path={`${match.url}/personalCenter`} component={PersonalCenter} />
      </Switch>
    </div>
  );
};

export default withStyles(styles)(Routes);
