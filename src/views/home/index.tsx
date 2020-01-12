import * as React from 'react'
import { withStyles } from '@material-ui/styles';
// import './index.scss'
interface HomeProps {
  match: any;
  classes;
}
const styles = (theme) => {
  return {
    root: {
      color:'red'
    }
  };
};
class Home extends React.Component<HomeProps,any> {

  render() {
    let {classes} = this.props
    return (
      <div className={classes.root}>
        <p>home</p>
      </div>
    )
  }
}
export default withStyles(styles)(Home);