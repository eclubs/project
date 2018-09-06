import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 800,
        marginTop: 70
    },
    media: {
        height: 240
    }
};

function enter() {
    window.location.href = 'https://curis-dev.cs.stanford.edu/protected/index.html';
}

function LandingPaper(props) {
    const { classes } = props;
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
            <Card className={classes.card}>

                <CardMedia
                    className={classes.media}
                    image="static/images/cs-building.jpg"
                    title="Gates"
                    />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">

                    </Typography>
                    <Typography component="p">
                        The CURIS program is a summer research internship program in Computer Science. Its goal is
                        to encourage students, particularly CS undergraduates, to get involved in CS research with
                        faculty mentors early in their careers. Students work with a faculty member, as part of
                        his/her group, for an entire summer, with the goal of producing an identifiable research
                        result. Students will receive a stipend, and will also be eligible for on-campus room and
                        board. The program is open to Stanford undergraduate students who maintain undergraduate
                        status through summer. Priority will be given to declared Computer Science undergraduate
                        majors.
                        <br/><br/>
                    </Typography>
                    <Typography component="p">
                        Please login using your SUNet ID to learn more.<br/><br/>
                    </Typography>
                    <Typography component="p">
                        The faculty member in charge of the program is Professor Phil Levis.<br/><br/>
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size="medium" color="primary" onClick={enter}>
                        Enter
                    </Button>
                </CardActions>
                <br/>
            </Card>
        </Grid>
    );
}

LandingPaper.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPaper);