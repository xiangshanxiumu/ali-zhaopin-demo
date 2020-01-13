import * as React from 'react';
import { withStyles } from '@material-ui/styles';

interface FooterProps{
    classes;
}
const styles = (theme) =>{
    return {
        root:{
            width:'100%',
            height:'4rem',
            backgroundColor: '#2C2F33',
            overflow: 'hidden',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            '& span':{
                color:'white',
                fontSize:'1rem',
                opacity: 0.4,
            }
        }
    }
}

class Footer extends React.Component<FooterProps,any>{
    public render(){
        let {classes} = this.props;
        return (
            <div className={classes.root}>
                <span>
                    阿里巴巴集团 Copyright ©1999-2020 版本所有
                </span>
            </div>
        )
    }
}
export default withStyles(styles)(Footer);