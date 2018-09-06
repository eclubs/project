import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    flex: {
        flexGrow: 1,
    }
};

function enter() {
    window.location.href = 'https://curis-dev.cs.stanford.edu/protected/index.html';
}

function NavBar(props) {
    const { classes } = props;
    return(
        <div>
            <AppBar position="static" style={{ backgroundColor: '#b1040e' }}>
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Stanford CS Research
                    </Typography>
                    {/*<Button color="inherit" onClick={enter}>Login</Button>*/}
                </Toolbar>
            </AppBar>
        </div>
    )
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar);