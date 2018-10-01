import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core/styles'
import UserIcon from './UserIcon.js'

const styles = {
    red: {
        backgroundColor: '#b1040e'
    },
    flex: {
        flexGrow: 1,
        'cursor': 'pointer'
    }
};

function go_home() {
    window.location.href="/protected/";
}

function NavBar(props) {
    const { classes } = props;
    return(
        <div>
            <AppBar position="fixed" className={classes.red}>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={go_home}>
                        <img width="32" height="32" src="static/images/home-icon4.png" alt="Home"/>
                    </IconButton>
                    <Typography variant="title" color="inherit" align="left" className={classes.flex} onClick={go_home}>
                        Stanford CS Research
                    </Typography>
                    <UserIcon user={props.user}/>
                </Toolbar>
            </AppBar>
        </div>
    )
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar);