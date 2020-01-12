import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Routes from './routes';
export interface AppProps {
  classes;
  match;
  history;
  location;
}
const styles: any = (theme) => {
  return {
    root:{

    },
    nav:{

    },
    content:{

    }
  }
}
class App extends React.Component<AppProps, any> {
  public render() {
    let { match, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.nav}>
          导航栏
        </div>
        <div className={classes.content}>
          <Routes match={match}/>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(withRouter(App));

