import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
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
            <AppBar position="static" className={classes.red}>
                <Toolbar>
                    <Typography variant="title" color="inherit" align="left" className={classes.flex} onClick={go_home}>
                        Stanford CS Research
                    </Typography>
                    <UserIcon/>
                </Toolbar>
            </AppBar>
        </div>
    )
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar);